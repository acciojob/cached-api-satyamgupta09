import React, { useEffect, useMemo, useState } from "react";
// import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const MemoizedData = useMemo(() => data, [data]);

  return (
    <div>
      <h1>Cached API</h1>
      <ul>
        {data &&
          MemoizedData.map((post, index) => (
            <li key={index}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
