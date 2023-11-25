import React from "react";
import leaf from "./leaf.png";

function PlantTile({ count }) {
  return (
    <div
      className="Component1"
      style={{ width: 200, height: 200, position: "relative", padding: "10px" }}
    >
      <div
        className="Rectangle1"
        style={{
          width: 200,
          height: 200,
          left: 0,
          top: 0,
          position: "absolute",
          background: "rgba(171.06, 214.71, 255, 0.40)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 10,
        }}
      />
      <img
        className="Leaf1"
        style={{
          width: 100,
          height: 101.69,
          left: 50,
          top: 44,
          position: "absolute",
        }}
        src={leaf}
      />
      <div
        className="Plant1"
        style={{
          width: 200,
          height: 44,
          left: 0,
          top: 0,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 20,
          fontFamily: "Inter",
          fontWeight: "600",
          wordWrap: "break-word",
          paddingTop: "10px",
        }}
      >
        Plant 1
      </div>
      <div
        className="Hydration0"
        style={{
          width: 200,
          height: 30,
          left: 0,
          top: 170,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        Hydration: {count}
      </div>
    </div>
  );
}

export default PlantTile;
