import React, { useState, useEffect } from "react";
import axios from "axios";

const GitHubRepos = ({ setSelectedRepo }) => {
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem("github_token");
      if (!token) {
        console.error("GitHub token not found!");
        return;
      }

      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <select onChange={(e) => setSelectedRepo(e.target.value)}>
      <option value="">Select a repository</option>
      {repos.map((repo) => (
        <option key={repo.id} value={repo.full_name}>
          {repo.full_name}
        </option>
      ))}
    </select>
  );
};

export default GitHubRepos;
