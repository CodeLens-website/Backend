import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
const NGROK_URL = " https://f41a-49-36-169-213.ngrok-free.app"; 

const createWebhook = async (token, repo) => {
  try {
    const response = await axios.post(
      `${GITHUB_API_URL}/repos/${repo}/hooks`,
      {
        name: "web",
        active: true,
        events: ["push"],
        config: {
          url: `${NGROK_URL}/api/webhook`,
          content_type: "json",
        },
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    );
    alert("Webhook successfully created!");
  } catch (error) {
    console.error("Error creating webhook", error);
    alert("Failed to create webhook. Ensure you have repo admin access.");
  }
};

const SetupWebhook = ({ token, selectedRepo }) => {
  return (
    <button onClick={() => createWebhook(token, selectedRepo)} disabled={!selectedRepo}>
      Setup Webhook
    </button>
  );
};

export default SetupWebhook;
