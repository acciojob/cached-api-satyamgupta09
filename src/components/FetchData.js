import React, { useEffect, useMemo, useState } from "react";

export default function FetchData({ userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const MemoizedData = useMemo(
    function () {
      const url = "https://jsonplaceholder.typicode.com/posts";
      return userId ? `${url}?userId=${userId}` : url;
    },
    [userId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(MemoizedData);
        const data = await res.json();
        setData(data);
        setLoading(false);

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, [MemoizedData]);

  return (
    <div>
      <h1>Cached API</h1>
      <ul>
        {loading && <p>Loading...</p>}
        {data &&
          !loading &&
          data.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
