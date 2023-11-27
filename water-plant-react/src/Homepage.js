import React, { useState } from "react";
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

  const [ws, setWs] = useState(null);

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

  const fetchData = async (val) => {
    if (ws) {
      ws.close();
      setWs(null);
      console.log("Websocket connection closed");
    } else {
      // Create a new WebSocket connection
      const newWs = new WebSocket("ws://localhost:8000");

      newWs.onopen = () => {
        console.log("Connected to the WebSocket server");
        newWs.send("start");
      };

      newWs.onmessage = (event) => {
        const { sensor1, sensor2, sensor3 } = JSON.parse(event.data);
        setCount([sensor1, sensor2, sensor3]);
        console.log("event.data = ", event.data);
        console.log("sensor1: ", sensor1);
        console.log("sensor2: ", sensor2);
      };

      newWs.onclose = () => {
        console.log("Disconnected from the WebSocket server");
      };
      setWs(newWs);
    }
  };

  return (
    <div className="App App-header">
      <h1>Water Plant Monitoring System</h1>
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
