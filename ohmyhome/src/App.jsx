import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HouseSelection from "./pages/HouseSelection";
import HomePage from "./pages/HomePage";
import LivingRoom from "./pages/LivingRoom";
import Lights from "./pages/Lights";
import AC from "./pages/AC";
import TV from "./pages/TV";
import Fan from "./pages/Fan";
import Speakers from "./pages/Speakers";
import Eco from './pages/Eco';
import './index.css';

// Helper functions for time/schedule
function getInitialSchedules() {
  const saved = localStorage.getItem("lightsSchedules");
  if (saved) return JSON.parse(saved);
  return [];
}
function timeTo24hr(hour, min, ampm) {
  let h = Number(hour);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return { hour: h, min: Number(min) };
}
function minutesSinceMidnight({ hour, min }) {
  return hour * 60 + min;
}
function isTimeInRange(current, from, to) {
  const c = minutesSinceMidnight(timeTo24hr(current.hr, current.min, current.ampm));
  const start = minutesSinceMidnight(timeTo24hr(from.hour, from.min, from.ampm));
  const end = minutesSinceMidnight(timeTo24hr(to.hour, to.min, to.ampm));
  if (start <= end) {
    return c >= start && c < end;
  } else {
    return c >= start || c < end;
  }
}
function getCurrentOnStatus(schedules) {
  const d = new Date();
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const now = { hr: h, min: d.getMinutes(), ampm };
  return schedules.some(s => isTimeInRange(now, s.from, s.to));
}

export default function App() {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [schedules, setSchedules] = useState(getInitialSchedules);
  const [manualOverride, setManualOverride] = useState(null);

  useEffect(() => {
    localStorage.setItem("lightsSchedules", JSON.stringify(schedules));
  }, [schedules]);

  const [lightStatus, setLightStatus] = useState(getCurrentOnStatus(schedules));
  useEffect(() => {
    const tick = () => setLightStatus(getCurrentOnStatus(schedules));
    const id = setInterval(tick, 10000);
    tick();
    return () => clearInterval(id);
  }, [schedules]);

  const effectiveLightStatus = manualOverride !== null ? manualOverride : lightStatus;

  const handleSelectHouse = (houseId) => {
    setSelectedHouse(houseId);
  };

  const handleBackToSelection = () => {
    setSelectedHouse(null);
  };

  return (
    <BrowserRouter>
      <Navbar onBack={handleBackToSelection} />
      <Routes>
        <Route
          path="/"
          element={
            selectedHouse ? (
              <HomePage />
            ) : (
              <HouseSelection onSelectHouse={handleSelectHouse} />
            )
          }
        />
        <Route
          path="/livingroom"
          element={
            selectedHouse ? (
              <LivingRoom
                lightStatus={effectiveLightStatus}
                setManualOverride={setManualOverride}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/lights"
          element={
            selectedHouse ? (
              <Lights
                schedules={schedules}
                setSchedules={setSchedules}
                lightStatus={effectiveLightStatus}
                setManualOverride={setManualOverride}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route 
          path="/ac" 
          element={selectedHouse ? <AC /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/tv" 
          element={selectedHouse ? <TV /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/fan" 
          element={selectedHouse ? <Fan /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/speakers" 
          element={selectedHouse ? <Speakers /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/eco" 
          element={selectedHouse ? <Eco /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}