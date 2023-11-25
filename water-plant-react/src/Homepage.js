import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import PlantTile from "./PlantTile";

const Homepage = ({ onLogout }) => {
  const [count, setCount] = useState([
    "No data yet",
    "No data yet",
    "No data yet",
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/data");
      setCount(response.data);
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
      <h1>Welcome to the Water Plant Monitoring 1System</h1>
      <div className="plant-container">
        <PlantTile count={count[0]} />
        <PlantTile count={count[1]} />
        <PlantTile count={count[2]} />
      </div>
      <button onClick={fetchData}>Fetch data?</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Homepage;
