import axios from "axios";

const BACKEND_API_URL = "http://localhost:5000";

export const fetchAnalysisResults = async () => {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/api/webook/results`);
        return response.data;
    } catch (error) {
        console.error("Error fetching analysis results:", error);
        return [];
    }
};
