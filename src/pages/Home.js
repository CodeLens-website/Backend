// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GitHubAuth from "../components/GitHubAuth";
// import GitHubRepos from "../components/GitHubRepos";
// import SetupWebhook from "../components/SetupWebhook";
// import { useNavigate } from 'react-router-dom';

// console.log("🔥 Home Component Loaded!");

// const Home = () => {
//     const [token, setToken] = useState(null);
//     const [repos, setRepos] = useState([]);
//     const [selectedRepo, setSelectedRepo] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("🏠 Home Component Mounted!");

//         const storedToken = localStorage.getItem("github_token");
//         if (storedToken) {
//             console.log("✅ Token Found in LocalStorage:", storedToken);
//             setToken(storedToken);
//             fetchRepos(storedToken);
//             return;
//         }

//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get("code");

//         if (code) {
//             console.log("🔄 GitHub OAuth Code Found:", code);
//             window.location.href = `/auth/callback?code=${code}`;
//         } else {
//             console.log("❌ No OAuth code found in URL");
//         }
//     }, []);

//     const exchangeCodeForToken = async (code) => {
//         try {
//             console.log("🚀 Exchanging Code for Token:", code);
//             const response = await axios.post("http://localhost:5000/api/auth/github", { code }, { withCredentials: true });
//             console.log("GitHub OAuth Response:", response.data);

//             if (response.data.access_token) {
//                 localStorage.setItem("github_token", response.data.access_token);
//                 setToken(response.data.access_token);
//                 fetchRepos(response.data.access_token);
//                 navigate('/');
//             } else {
//                 console.error("No access token received from backend");
//             }
//         } catch (error) {
//             console.error("Error exchanging code for token:", error);
//         }
//     };

//     const fetchRepos = async (token) => {
//         try {
//             const response = await axios.get("https://api.github.com/user/repos", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: "application/vnd.github.v3+json",
//                 },
//             });
//             console.log("Fetched Repos:", response.data);
//             setRepos(response.data || []);
//         } catch (error) {
//             console.error("Error fetching repositories:", error.response?.data || error);
//         }
//     };

//     return (
//         <div>
//             <h1>GitHub Webhook Setup</h1>
//             {!token ? (
//                 <GitHubAuth setToken={setToken} />
//             ) : (
//                 <div>
//                     <h2>Your Repositories</h2>
//                     {repos.length === 0 ? (
//                         <p>Loading repositories...</p>
//                     ) : (
//                         <ul>
//                             {repos.map((repo) => (
//                                 <li key={repo.id}>
//                                     <span>{repo.full_name}</span>
//                                     <button onClick={() => setSelectedRepo(repo.full_name)}>
//                                         Select
//                                     </button>
//                                     {selectedRepo === repo.full_name && (
//                                         <div>
//                                             <SetupWebhook token={token} selectedRepo={repo.full_name} />
//                                         </div>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
import GitHubAuth from "../components/GitHubAuth";
import SetupWebhook from "../components/SetupWebhook";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [token, setToken] = useState(null);
    const [repos, setRepos] = useState([]);
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("github_token");
        if (storedToken) {
            setToken(storedToken);
            fetchRepos(storedToken);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            if (code) {
                exchangeCodeForToken(code);
            }
        }
    }, []);

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/github", { code }, { withCredentials: true });
            if (response.data.access_token) {
                localStorage.setItem("github_token", response.data.access_token);
                setToken(response.data.access_token);
                fetchRepos(response.data.access_token);
                navigate('/');
            } else {
                console.error("No access token received from backend");
            }
        } catch (error) {
            console.error("Error exchanging code for token:", error);
        }
    };

    const handleWebhookResponse = (data) => {
        setResponseData(data);
        localStorage.setItem("flask_response", JSON.stringify(data));
        console.log("handleWebhookResponse triggered") // Save to localStorage
        navigate("/response"); // Redirect to the response page
    };

    const fetchRepos = async (token) => {
        try {
            const response = await axios.get("https://api.github.com/user/repos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });
            setRepos(response.data || []);
        } catch (error) {
            console.error("Error fetching repositories:", error.response?.data || error);
        }
    };

    return (
        <div>
            <h1>GitHub Webhook Setup</h1>
            {!token ? (
                <GitHubAuth setToken={setToken} />
            ) : (
                <div>
                    <h2>Your Repositories</h2>
                    {repos.length === 0 ? (
                        <p>Loading repositories...</p>
                    ) : (
                        <div style={styles.repoContainer}>
                            {repos.map((repo) => (
                                <div key={repo.id} style={styles.card}>
                                    <h3>{repo.full_name}</h3>
                                    <p>{repo.description || "No description available."}</p>
                                    <SetupWebhook token={token} selectedRepo={repo.full_name} onResponse={handleWebhookResponse}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    repoContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        width: "300px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
};

export default Home;
