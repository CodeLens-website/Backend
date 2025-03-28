import React from "react";

const CLIENT_ID = "Ov23liusdrP3soV4CboH";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const GitHubAuth = () => {
    const handleLogin = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
        window.location.href = githubAuthUrl;
    };

    return <button onClick={handleLogin}>Login with GitHub</button>;
};

export default GitHubAuth;
