// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GitHubAuth from "../components/GitHubAuth";

// console.log("🔥 Home Component Loaded!");
// const Home = () => {
//     const [token, setToken] = useState(null);
//     const [repos, setRepos] = useState([]);

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
//             setRepos(response.data);
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
//                     <ul>
//                         {repos.map((repo) => (
//                             <li key={repo.id}>{repo.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GitHubAuth from "../components/GitHubAuth";
// import GitHubRepos from "../components/GitHubRepos"; // Import the GitHubRepos component

// console.log("🔥 Home Component Loaded!");
// const Home = () => {
//     const [token, setToken] = useState(null);
//     const [repos, setRepos] = useState([]);
//     const [selectedRepo, setSelectedRepo] = useState(null); // Add state for selectedRepo

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
//             setRepos(response.data);
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
//                     <GitHubRepos repos={repos} setSelectedRepo={setSelectedRepo} /> {/* Use GitHubRepos component */}
                    
//                     {selectedRepo && (
//                         <div>
//                             <h3>Selected Repo: {selectedRepo}</h3>
//                             {/* Add further functionality here */}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GitHubAuth from "../components/GitHubAuth";
// import GitHubRepos from "../components/GitHubRepos"; // Import the GitHubRepos component

// console.log("🔥 Home Component Loaded!");
// const Home = () => {
//     const [token, setToken] = useState(null);
//     const [repos, setRepos] = useState([]);
//     const [selectedRepo, setSelectedRepo] = useState(null); // Add state for selectedRepo

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
//             console.log("Fetched Repos:", response.data); // Log the fetched repos
//             setRepos(response.data || []); // Ensure repos is always an array
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
//                     <GitHubRepos repos={repos} setSelectedRepo={setSelectedRepo} /> {/* Use GitHubRepos component */}
                    
//                     {selectedRepo && (
//                         <div>
//                             <h3>Selected Repo: {selectedRepo}</h3>
//                             {/* Add webhook setup logic or other functionalities here */}
//                         </div>
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
import GitHubRepos from "../components/GitHubRepos";
import SetupWebhook from "../components/SetupWebhook";
import { useNavigate } from 'react-router-dom';

console.log("🔥 Home Component Loaded!");

const Home = () => {
    const [token, setToken] = useState(null);
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🏠 Home Component Mounted!");

        const storedToken = localStorage.getItem("github_token");
        if (storedToken) {
            console.log("✅ Token Found in LocalStorage:", storedToken);
            setToken(storedToken);
            fetchRepos(storedToken);
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            console.log("🔄 GitHub OAuth Code Found:", code);
            window.location.href = `/auth/callback?code=${code}`;
        } else {
            console.log("❌ No OAuth code found in URL");
        }
    }, []);

    const exchangeCodeForToken = async (code) => {
        try {
            console.log("🚀 Exchanging Code for Token:", code);
            const response = await axios.post("http://localhost:5000/api/auth/github", { code }, { withCredentials: true });
            console.log("GitHub OAuth Response:", response.data);

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

    const fetchRepos = async (token) => {
        try {
            const response = await axios.get("https://api.github.com/user/repos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });
            console.log("Fetched Repos:", response.data);
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
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.id}>
                                    <span>{repo.full_name}</span>
                                    <button onClick={() => setSelectedRepo(repo.full_name)}>
                                        Select
                                    </button>
                                    {selectedRepo === repo.full_name && (
                                        <div>
                                            <SetupWebhook token={token} selectedRepo={repo.full_name} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
