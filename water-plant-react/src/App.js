import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState("No data yet");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data");
      console.log(response);
      console.log(response.data);
      setCount(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={fetchData}>Fetch data?</button>
        <div>{count}</div>
      </header>
    </div>
  );
}

export default App;
