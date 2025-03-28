import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

export const getUserRepos = async (token) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE}/user/repos`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

export const createWebhook = async (token, repoFullName, backendUrl) => {
    try {
        const response = await axios.post(
            `${GITHUB_API_BASE}/repos/${repoFullName}/hooks`,
            {
                name: "web",
                active: true,
                events: ["push"],
                config: {
                    url: backendUrl,
                    content_type: "json"
                }
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating webhook:", error);
        return null;
    }
};
