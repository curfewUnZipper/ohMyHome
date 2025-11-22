import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/appliances.css";

export default function Appliance({ name, status, setManualOverride }) {
  const [on, setOn] = useState(false);
  const navigate = useNavigate();

  // Choose whether UI uses external or local state
  const trueStatus = setManualOverride ? status : on;

  const applianceMap = {
    Lights: "lamp",
    AC: "ac",
    TV: "tv",
    Fan: "fan",
    Speakers: "speaker"
  };

  const backendName = applianceMap[name] || name.toLowerCase();

  const sendToBackend = async (newState) => {
    const endpoint = newState ? "on" : "off";

    const payload = {
      room: "living_room",
      appliance: backendName,
      profile: sessionStorage.getItem("profile") || "Guest"
    };

    try {
      await fetch(`http://localhost:5000/control/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      console.log(`✔️ Backend notified: ${endpoint}`, payload);
    } catch (error) {
      console.error("❌ Backend error:", error);
    }
  };

  const handleClick = () => navigate(`/${name.toLowerCase()}`);

  const handleToggle = (e) => {
    e.stopPropagation();
    const nextState = !trueStatus;

    // Update UI correctly depending on appliance
    if (setManualOverride) {
      setManualOverride(nextState);
    } else {
      setOn(nextState);
    }

    sendToBackend(nextState);
  };

  return (
    <div className="appliance-card cursor-pointer" onClick={handleClick}>
      <h3 className="appliance-title">{name}</h3>

      <div className={`appliance-status ${trueStatus ? "status-on" : "status-off"}`}>
        Status: {trueStatus ? "On" : "Off"}
      </div>

      <button className="toggle-btn" onClick={handleToggle}>
        Turn {trueStatus ? "Off" : "On"}
      </button>
    </div>
  );
}
