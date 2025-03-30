import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import AuthCallback from "./pages/AuthCallback";
import GitHubAuth from "./components/GitHubAuth";
import GitHubRepos from "./components/GitHubRepos";
import SetupWebhook from "./components/SetupWebhook";
import ResponsePage from "./pages/ResponsePage";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("github_token"));

    console.log("🔥 App Rendered! Token:", token);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/response" element={<ResponsePage />} />
                <Route path="/repos" element={<GitHubRepos token={token} />} />
                <Route path="/webhook" element={<SetupWebhook token={token} />} />
                <Route path="/results" element={<Results />} />
                <Route path="/auth/callback" element={<AuthCallback setToken={setToken} />} />
            </Routes>
        </Router>
    );
};

export default App;
