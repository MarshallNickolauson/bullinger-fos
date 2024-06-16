import React, { useState, useEffect } from 'react'
import config from '../config/config'

export default function Usages() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiEndpoint = config.apiBaseUrl + "/usages";
        console.log(apiEndpoint)

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(config.apiBaseUrl + "/usages");
                if (!response.ok) {
                    throw new Error('Network response was not OK')
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <h1>Usages page</h1>
        <pre className="json-data">{JSON.stringify(data, null, 4)}</pre>
        </>
    )
}