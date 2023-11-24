import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

const Homepage = ({ onLogout }) => {
  const [count, setCount] = useState("No data yet");

  const fetchData = async () => {
    try {
      const response = await axios.get("/data");
      setCount(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/logout");
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="App App-header">
      <h1>Welcome to the Water Plant Monitoring System</h1>
      {/* Main Page Content */}
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <button onClick={fetchData}>Fetch data?</button>
      <div>{count}</div>
      <button onClick={logout}>Logout</button>
      {/* Logout logic will need to be implemented */}
    </div>
  );
};

export default Homepage;
