// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const BACKEND_API_URL = "http://localhost:5000"; // Replace with your actual backend URL

// const AuthCallback = ({ setToken }) => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const urlParams = new URLSearchParams(location.search);
//         const code = urlParams.get("code");

//         if (code) {
//             exchangeCodeForToken(code);
//         }
//     }, [location]);

//     const exchangeCodeForToken = async (code) => {
//         try {
//             const response = await axios.post(`${BACKEND_API_URL}/api/auth/github`, { code });
//             const token = response.data.access_token;

//             if (token) {
//                 localStorage.setItem("github_token", token);
//                 setToken(token);
//                 navigate("/"); // Redirect to home
//             }
//         } catch (error) {
//             console.error("Error exchanging code for token:", error);
//         }
//     };

//     return <div>Authenticating...</div>;
// };

// export default AuthCallback;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthCallback = ({ setToken }) => {
//     console.log("🔥 AuthCallback Component Loaded!");

//     const navigate = useNavigate();

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get("code");
//         console.log("🔄 GitHub OAuth Code Found:", code);

//         if (code) {
//             exchangeCodeForToken(code);
//         } else {
//             console.error("❌ No GitHub OAuth Code found in URL");
//         }
//     }, []);

//     const exchangeCodeForToken = async (code) => {
//         try {
//             console.log("🚀 Sending Code to Backend:", code);
//             const response = await axios.post("http://localhost:5000/api/auth/github", { code }, { withCredentials: true });
//             console.log("✅ GitHub OAuth Response:", response.data);

//             if (response.data.access_token) {
//                 localStorage.setItem("github_token", response.data.access_token);
//                 setToken(response.data.access_token);
//                 navigate("/"); // Redirect to home
//             } else {
//                 console.error("❌ No access token received from backend");
//             }
//         } catch (error) {
//             console.error("🚨 Error exchanging code for token:", error.response?.data || error);
//         }
//     };

//     return <h1>Authenticating...</h1>;
// };

// export default AuthCallback;
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthCallback = ({ setToken }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        console.log("🔑 GitHub OAuth Code:", code);

        if (code) {
            exchangeCodeForToken(code);
        }
    }, []);

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/github", { code });
            console.log("✅ Backend Response:", response.data);

            if (response.data.access_token) {
                localStorage.setItem("github_token", response.data.access_token);
                setToken(response.data.access_token);
                navigate("/repos");
            }
        } catch (error) {
            console.error("❌ Error exchanging code for token:", error);
        }
    };

    return <div>Processing Login...</div>;
};

export default AuthCallback;
