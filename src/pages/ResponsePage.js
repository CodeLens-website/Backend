import React, { useState, useEffect } from "react";

const ResponsePage = () => {
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("flask_response");
        if (storedData) {
            setResponseData(JSON.parse(storedData));
        }
    }, []);

    return (
        <div>
            <h1>Flask API Response</h1>
            {responseData ? (
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
            ) : (
                <p>No response data available.</p>
            )}
        </div>
    );
};

export default ResponsePage;
