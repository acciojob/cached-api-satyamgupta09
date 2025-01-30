import React, { useEffect, useMemo, useState } from "react";
import './../styles/App.css';
import FetchData from "./FetchData";

const App = () => {
  const [userId, setUserId] = useState("");
  return (
    <div>
      <input
        type="number"
        id="userid"
        placeholder="Enter userId"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      <FetchData userId={userId} />
    </div>
  );
};

export default App;
