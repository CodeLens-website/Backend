const express = require("express");
const axios = require("axios");
const router = express.Router();

const FLASK_API_URL = process.env.FLASK_API_URL;
if (!FLASK_API_URL) {
    console.error("FLASK_API_URL is not set in environment variables.");
}

router.post("/", async (req, res) => {
    try {
        console.log("Webhook Received:", JSON.stringify(req.body, null, 2));
        
        const { repository, after: commit_hash, commits } = req.body;
        if (!Array.isArray(commits)) {
            console.log("No commits array found in webhook payload.");
            return res.json({ message: "No commits found. Skipping analysis." });
        }

        // Extract modified files from commits
        const modified_files = commits.flatMap(commit => [
            ...(commit.added || []),
            ...(commit.modified || []),
            ...(commit.removed || [])
        ]);

        if (!modified_files || modified_files.length === 0) {
            console.log("No modified files found. Skipping analysis.");
            return res.json({ message: "No modified files found. Skipping analysis." });
        }

        let fileContents = {};
        for (const file of modified_files) {
            try {
                const fileContent = await fetchFileContent(repository.full_name, file);
                if (fileContent) {
                    fileContents[file] = fileContent;
                }
            } catch (fetchError) {
                console.error(`Error fetching content for ${file}:`, fetchError.message);
            }
        }

        if (Object.keys(fileContents).length === 0) {
            console.log("No relevant files to analyze.");
            return res.json({ message: "No relevant files to analyze." });
        }

        console.log("Sending request to Flask API:", { repo: repository.full_name, commit: commit_hash, files: fileContents });

        const flaskResponse = await axios.post(`${FLASK_API_URL}/predict`, {
            repo: repository.full_name,
            commit: commit_hash,
            files: fileContents
        });

        console.log("Flask API Response:", flaskResponse.data);
        return res.json(flaskResponse.data);
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(500).json({ error: "Failed to process webhook data", details: error.message });
    }
});

async function fetchFileContent(repoFullName, filePath) {
    try {
        // Implement API call to fetch raw file content from repo (GitHub/GitLab)
        return "mock file content"; // Replace this with actual file fetching logic
    } catch (error) {
        console.error(`Error fetching file content for ${filePath}:`, error.message);
        throw error;
    }
}

router.get("/results", async (req, res) => {
    try {
        console.log("Fetching analysis results from Flask...");

        const flaskResponse = await axios.get(`${FLASK_API_URL}/results`);
        return res.json(flaskResponse.data);
    } catch (error) {
        console.error("Error fetching results:", error.message);
        res.status(500).json({ error: "Failed to fetch results", details: error.message });
    }
});

module.exports = router;
