import React, { useEffect, useMemo, useState } from 'react';

const FetchData = ({userId}) => {

    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState([]);

    const apiUrl = useMemo(() => {
        const baseUrl = "https://jsonplaceholder.typicode.com/posts";
        return userId ? `${baseUrl}?userId=${userId}` : baseUrl;
    }, [userId]);

    useEffect(() => {
        fetch(apiUrl)
            .then(resolve => resolve.json())
            .then(data => {
                setValue(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [apiUrl])

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <ul>
                {
                    value.length > 0 ? value.map((data, index) => {
                        return <li key={index}>
                            <h4>{data.title}</h4>
                            <p>{data.body}</p>
                        </li>
                    }) : <p>No Result Found!</p>
                }
            </ul>
        </div>
    )
}

export default FetchData;
