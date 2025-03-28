require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const axios = require("axios");

// GitHub OAuth Configuration
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || "blue"; // Default JWT_SECRET if not in .env

// Route: POST /api/auth/createuser
router.post('/createuser', [
    body('name.fname', 'First name must be at least 3 characters long').isLength({ min: 3 }),
    body('name.lname', 'Last name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 8 to 20 characters long').isLength({ min: 8, max: 20 }),
    body('cpassword', 'Confirm password must be 8 to 20 characters long').isLength({ min: 8, max: 20 }),
    body('phno', 'Enter a valid phone number').isMobilePhone(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }
        if (req.body.password !== req.body.cpassword) {
            return res.status(400).json({ success, error: "Passwords do not match" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: {
                fname: req.body.name.fname,
                lname: req.body.name.lname
            },
            email: req.body.email,
            password: secPass,
            cpassword: secPass,
            phno: req.body.phno,
        });
        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route: POST /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route: GET /api/auth/getuser (Protected)
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").select("-cpassword");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

router.post("/github", async (req, res) => {
    console.log("Request Body:", req.body);
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Authorization code is missing" });
    }

    try {
        // 🔹 Step 1: Exchange the code for an access token
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
            },
            { headers: { Accept: "application/json" } }
        );

        console.log("🔑 GitHub Token Response:", tokenResponse.data);

        const access_token = tokenResponse.data.access_token;
        console.log(access_token);
        if (!access_token) {
            return res.status(400).json({ error: "Failed to obtain access token" });
        }

        // 🔹 Step 2: Fetch the user's repositories
        const reposResponse = await axios.get("https://api.github.com/user/repos", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const repositories = reposResponse.data.map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
            full_name: repo.full_name,
            private: repo.private,
            url: repo.html_url,
        }));

        return res.json({ success: true, access_token, repositories });
    } catch (error) {
        console.error("GitHub OAuth error:", error.response?.data || error.message);
        return res.status(500).json({ error: "GitHub authentication failed" });
    }
});

module.exports = router;
