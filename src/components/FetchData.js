import React, { useEffect, useMemo, useState } from "react";

export default function FetchData({ userId }) {
  const [data, setData] = useState([]);

  const MemoizedData = useMemo(
    function () {
      const url = "https://jsonplaceholder.typicode.com/posts";
      return userId ? `${url}?userId=${userId}` : url;
    },
    [userId]
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(MemoizedData);
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    fetchData();
  }, [MemoizedData]);

  return (
    <div>
      <h1>Cached API</h1>
      <ul>
        {data &&
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
