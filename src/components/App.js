import React, { useState, useEffect, useMemo } from 'react';
import "./../styles/App.css";

const App = () => {
  // State variables for storing fetched data, loading state, and error handling
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the data so that it doesn't re-fetch unless the data changes
  const memoizedData = useMemo(() => data, [data]); // Data is memoized based on the 'data' state

  // Fetching data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before making the request
      setError(null); // Reset any previous errors

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result); // Store the data in the state
      } catch (err) {
        setError(err.message); // Handle any error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData(); // Fetch data on mount or when inputs change
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      <h1>Fetched Posts</h1>

      {/* Show loading spinner while data is being fetched */}
      {loading && <p>Loading data...</p>}

      {/* Show error message if there is an error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display the fetched and cached data */}
      {!loading && !error && (
        <ul>
          {memoizedData.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

