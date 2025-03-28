import React, { useState, useEffect } from "react";
import { fetchAnalysisResults } from "../api/backend";

const Results = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const loadResults = async () => {
            const data = await fetchAnalysisResults();
            setResults(data);
        };
        loadResults();
    }, []);

    return (
        <div>
            <h1>Analysis Results</h1>
            {results.length === 0 ? (
                <p>No analysis results available.</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <strong>Repo:</strong> {result.repository} <br />
                            <strong>Commit:</strong> {result.commit} <br />
                            <strong>Files:</strong>
                            <ul>
                                {Object.entries(result.analysis).map(([file, details]) => (
                                    <li key={file}>
                                        {file}: {details.technical_debt_score} ({details.message})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Results;
