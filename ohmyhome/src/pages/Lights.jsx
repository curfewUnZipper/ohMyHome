import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);

// ---------- Helpers ----------
function formatTime(time) {
  let [hr, min] = time.split(":").map(Number);
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${String(min).padStart(2, "0")} ${ampm}`;
}

function convertTo24(t) {
  let { hour, min, ampm } = t;
  hour = Number(hour);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

function convert24To12(time) {
  let [hr, min] = time.split(":").map(Number);
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return { hour: hr, min, ampm };
}

function compress(raw) {
  if (!raw.length) return [];
  let grouped = [];
  let start = raw[0].time;
  let state = raw[0].state;
  let confSum = raw[0].confidence;
  let count = 1;

  for (let i = 1; i < raw.length; i++) {
    if (raw[i].state === state) {
      confSum += raw[i].confidence;
      count++;
    } else {
      grouped.push({
        from: start,
        to: raw[i - 1].time,
        state,
        confidence: Math.round((confSum / count) * 100)
      });
      start = raw[i].time;
      state = raw[i].state;
      confSum = raw[i].confidence;
      count = 1;
    }
  }

  grouped.push({
    from: start,
    to: raw[raw.length - 1].time,
    state,
    confidence: Math.round((confSum / count) * 100)
  });

  return grouped;
}

// ---------- Component ----------
export default function Lights({ schedules, setSchedules, lightStatus }) {
  const navigate = useNavigate();

  const [mlSchedule, setMlSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdder, setShowAdder] = useState(false);

  // USER schedule selection inputs
  const [fromHour, setFromHour] = useState(8);
  const [fromMinute, setFromMinute] = useState(0);
  const [fromAMPM, setFromAMPM] = useState("PM");
  const [toHour, setToHour] = useState(10);
  const [toMinute, setToMinute] = useState(0);
  const [toAMPM, setToAMPM] = useState("PM");

  // 🚀 Fetch ML Schedule
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch(
          "http://localhost:5000/schedule?room=living_room&appliance=light"
        );
        const json = await res.json();

        const cleaned = json.raw_predictions.map((p) => ({
          time: p.time,
          state: p.state.trim().toUpperCase(),
          confidence: p.confidence
        }));

        setMlSchedule(compress(cleaned));
      } catch (err) {
        console.error("❌ ML fetch failed:", err);
      }
      setLoading(false);
    }
    fetchSchedule();
  }, []);

  // 📥 Fetch USER Schedule on load
  useEffect(() => {
    async function fetchUserSchedule() {
      try {
        const res = await fetch(
          "http://localhost:5000/schedule?room=living_room&appliance=light"
        );
        const data = await res.json();

        if (data.schedule) {
          setSchedules(
            data.schedule.map((s) => ({
              from: convert24To12(s.on),
              to: convert24To12(s.off)
            }))
          );
        }
      } catch (err) {
        console.error("❌ Failed loading user schedule:", err);
      }
    }
    fetchUserSchedule();
  }, []);

  const removeSchedule = (idx) =>
    setSchedules((s) => s.filter((_, i) => i !== idx));

  return (
    <div className="bg-brand-bg min-h-screen w-full flex flex-col items-center pt-14">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-8 mb-10">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-brand-primary tracking-wide">
            Lights
          </span>
          <span
            className={`px-3 py-1 font-bold rounded-full text-lg ${
              lightStatus ? "bg-green-500 text-white" : "bg-slate-500 text-white"
            }`}
          >
            {lightStatus ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      {/* ---- ML Schedule Table ---- */}
      <div className="w-full max-w-2xl mb-8">
        <span className="text-xl font-bold text-brand-primary">ML Schedule</span>

        <div className="w-full rounded-2xl shadow-lg p-4 border-2 border-brand-primary mt-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 text-brand-primary text-lg font-semibold">
                  Time
                </th>
                <th className="py-2 text-brand-primary text-lg font-semibold">
                  State
                </th>
                <th className="py-2 text-brand-primary text-lg font-semibold">
                  Confidence
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : mlSchedule.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400">
                    No ML schedule found
                  </td>
                </tr>
              ) : (
                mlSchedule.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2 text-lg text-center">
                      {formatTime(item.from)} – {formatTime(item.to)}
                    </td>
                    <td className="py-2 text-lg text-center">
                      <span
                        className={`px-4 py-1 rounded-full font-bold text-md ${
                          item.state === "ON"
                            ? "bg-green-500 text-white"
                            : "bg-slate-500 text-white"
                        }`}
                      >
                        {item.state}
                      </span>
                    </td>
                    <td className="py-2 text-lg text-center text-yellow-400 font-bold">
                      {item.confidence}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

        {/* ---- USER SCHEDULE TABLE ---- */}
<div className="w-full max-w-2xl mb-16">
  <div className="flex flex-row items-center gap-2 mb-2">
    <span className="text-lg font-bold text-brand-primary">My Schedule</span>

    {!showAdder && (
      <button
        className="ml-1 px-3 py-1 bg-brand-primary text-white rounded-full text-2xl font-bold"
        onClick={() => setShowAdder(true)}
      >
        +
      </button>
    )}
  </div>

  {/* Table */}
  <div className="w-full rounded-2xl shadow-lg p-4 border-2 border-brand-primary mt-2">
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="py-2 text-brand-primary text-lg font-semibold text-center">Time</th>
          <th className="py-2 text-brand-primary text-lg font-semibold text-center">Status</th>
          <th className="py-2 text-brand-primary text-lg font-semibold text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {schedules.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center py-4 text-gray-400">
              No schedules added yet
            </td>
          </tr>
        ) : (
          schedules.map((sched, idx) => (
            <tr key={idx} className="hover:bg-brand-hover transition text-center">
              <td classname="py-2 text-lg">
                {`${sched.from.hour}:${String(sched.from.min).padStart(2, "0")} ${sched.from.ampm} – 
                ${sched.to.hour}:${String(sched.to.min).padStart(2, "0")} ${sched.to.ampm}`}
              </td>

              <td className="py-2 text-lg">
                <span className="px-4 py-1 rounded-full bg-green-600 text-white font-bold">
                  ON
                </span>
              </td>

              <td className="py-2 text-lg">
                <button
                  className="bg-red-500 px-3 py-1 text-white rounded shadow font-bold hover:bg-red-600"
                  onClick={() => removeSchedule(idx)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>


        {/* Schedule Adder UI */}
        {showAdder && (
          <div className="bg-brand-bg rounded-lg shadow p-6 flex flex-col gap-4 border-2 border-brand-primary mt-4">
            {/* Time Select */}
            <div className="flex gap-8 justify-center items-center">
              {/* FROM */}
              <div>
                <span className="text-brand-primary font-bold">FROM</span>
                <div className="flex gap-2 mt-1">
                  <select
                    value={fromHour}
                    onChange={(e) => setFromHour(Number(e.target.value))}
                    className="bg-brand-primary text-white px-4 py-2 rounded"
                  >
                    {hours.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  :
                  <select
                    value={fromMinute}
                    onChange={(e) => setFromMinute(Number(e.target.value))}
                    className="bg-brand-primary text-white px-4 py-2 rounded"
                  >
                    {minutes.map((m) => (
                      <option key={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                  </select>
                  <select
                    value={fromAMPM}
                    onChange={(e) => setFromAMPM(e.target.value)}
                    className="bg-brand-primary text-white px-3 py-2 rounded"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>

              {/* TO */}
              <div>
                <span className="text-brand-primary font-bold">TO</span>
                <div className="flex gap-2 mt-1">
                  <select
                    value={toHour}
                    onChange={(e) => setToHour(Number(e.target.value))}
                    className="bg-brand-primary text-white px-4 py-2 rounded"
                  >
                    {hours.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  :
                  <select
                    value={toMinute}
                    onChange={(e) => setToMinute(Number(e.target.value))}
                    className="bg-brand-primary text-white px-4 py-2 rounded"
                  >
                    {minutes.map((m) => (
                      <option key={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                  </select>
                  <select
                    value={toAMPM}
                    onChange={(e) => setToAMPM(e.target.value)}
                    className="bg-brand-primary text-white px-3 py-2 rounded"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save/Cancel Row */}
            <div className="flex justify-between pt-5">
              <button
                className="bg-red-500 px-8 py-3 text-white font-bold rounded-full text-lg"
                onClick={() => setShowAdder(false)}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 px-8 py-3 text-white font-bold rounded-full text-lg"
                onClick={async () => {
                  // build new entry before setting state
                  const newEntry = {
                    from: { hour: fromHour, min: fromMinute, ampm: fromAMPM },
                    to: { hour: toHour, min: toMinute, ampm: toAMPM }
                  };

                  const updatedSchedules = [...schedules, newEntry];
                  setSchedules(updatedSchedules);
                  setShowAdder(false);

                  // convert to backend format
                  const backendSchedule = updatedSchedules.map((s) => ({
                    day: new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase(),
                    on: convertTo24(s.from),
                    off: convertTo24(s.to)
                  }));

                  // send to backend
                  try {
                    await fetch("http://localhost:5000/schedule", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        room: "living_room",
                        appliance: "light",
                        schedule: backendSchedule
                      })
                    });

                    console.log("✔ schedule saved", backendSchedule);
                  } catch (err) {
                    console.error("❌ saving schedule failed:", err);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
