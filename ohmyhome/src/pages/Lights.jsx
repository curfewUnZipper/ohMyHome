import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Base URL for all API requests (used for GET and POST)
const BASE_URL = "/schedules";

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

// ---------- Component ----------
export default function Lights({ schedules, setSchedules, lightStatus }) {
  const navigate = useNavigate();

  const [manualSchedules, setManualSchedules] = useState([]);
  const [mlSchedules, setMlSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdder, setShowAdder] = useState(false);

  // USER schedule selection inputs
  const [fromHour, setFromHour] = useState(8);
  const [fromMinute, setFromMinute] = useState(0);
  const [fromAMPM, setFromAMPM] = useState("PM");
  const [toHour, setToHour] = useState(10);
  const [toMinute, setToMinute] = useState(0);
  const [toAMPM, setToAMPM] = useState("PM");

  // Helper to send the entire current state back to the backend
  // *** AWAIT REMOVED HERE ***
  const postAllSchedules = (manual, ml) => {
    const payload = {
      manual_schedules: manual,
      ml_schedules: ml,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => console.log("✔ Schedules successfully posted to backend."))
      .catch((err) => console.error("❌ Failed to post schedules:", err));
  };

  // 🚀 Fetch Schedules from Backend
  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        console.log(data);

        if (data.manual_schedules) {
          setManualSchedules(data.manual_schedules);
        }
        if (data.ml_schedules) {
          setMlSchedules(data.ml_schedules);
        }
      } catch (err) {
        console.error("❌ Schedule fetch failed:", err);
      }
      setLoading(false);
    }
    fetchSchedules();
  }, []);

  // Toggle checkbox for manual schedules
  const toggleManualCheck = (index) => {
    const updatedManual = [...manualSchedules];
    updatedManual[index].checked = !updatedManual[index].checked;
    setManualSchedules(updatedManual);
    
    // *** AWAIT REMOVED HERE ***
    postAllSchedules(updatedManual, mlSchedules);
  };

  // Toggle checkbox for ML schedules
  const toggleMlCheck = (index) => {
    const updatedML = [...mlSchedules];
    updatedML[index].checked = !updatedML[index].checked;
    setMlSchedules(updatedML);
    
    // *** AWAIT REMOVED HERE ***
    postAllSchedules(manualSchedules, updatedML);
  };

  // Delete manual schedule
  const deleteManualSchedule = (index) => {
    // Filter out the deleted schedule
    const updatedManual = manualSchedules.filter((_, i) => i !== index);
    setManualSchedules(updatedManual);

    // *** AWAIT REMOVED HERE ***
    postAllSchedules(updatedManual, mlSchedules);
  };

  // Function to handle adding a new manual schedule
  const handleAddSchedule = () => {
    const newSchedule = {
      date: new Date().toISOString().split('T')[0],
      appliance: "light",
      on_time: convertTo24({ hour: fromHour, min: fromMinute, ampm: fromAMPM }),
      off_time: convertTo24({ hour: toHour, min: toMinute, ampm: toAMPM }),
      checked: false
    };

    const updatedManual = [...manualSchedules, newSchedule];
    setManualSchedules(updatedManual);
    setShowAdder(false);

    // *** AWAIT REMOVED HERE ***
    postAllSchedules(updatedManual, mlSchedules);
  };

  return (
    <div className="bg-brand-bg min-h-screen w-full flex flex-col items-center pt-8 md:pt-14 px-4">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6 md:mb-10">
        <span className="text-xl md:text-2xl font-bold text-brand-primary tracking-wide">
          Light Schedule
        </span>
      </div>

      {/* ---- ML Schedule Table ---- */}
      <div className="w-full max-w-4xl mb-6 md:mb-8">
        <span className="text-lg md:text-xl font-bold text-brand-primary">ML Schedule</span>

        <div className="w-full rounded-lg md:rounded-2xl shadow-lg p-2 md:p-4 border-2 border-brand-primary mt-2 overflow-x-auto">
          <table className="w-full table-auto text-sm md:text-base">
            <thead>
              <tr>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold">Date</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold">Time</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold">Status</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold">Active</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400 text-sm">
                    Loading...
                  </td>
                </tr>
              ) : mlSchedules.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400 text-sm">
                    No ML schedule found
                  </td>
                </tr>
              ) : (
                mlSchedules.map((item, i) => (
                  <tr key={i} className="hover:bg-brand-hover transition">
                    <td className="py-2 px-1 md:px-2 text-xs md:text-lg text-center">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-1 md:px-2 text-xs md:text-lg text-center">
                      {formatTime(item.on_time)} – {formatTime(item.off_time)}
                    </td>
                    <td className="py-2 px-1 md:px-2 text-center">
                      <span className="px-2 md:px-4 py-1 rounded-full font-bold text-xs md:text-md bg-green-500 text-white">
                        ON
                      </span>
                    </td>
                    <td className="py-2 px-1 md:px-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleMlCheck(i)}
                        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-brand-primary"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- Manual Schedule Table ---- */}
      <div className="w-full max-w-4xl mb-12 md:mb-16">
        <div className="flex flex-row items-center gap-2 mb-2">
          <span className="text-base md:text-lg font-bold text-brand-primary">My Schedule</span>

          {!showAdder && (
            <button
              className="ml-1 px-2 md:px-3 py-1 bg-brand-primary text-white rounded-full text-xl md:text-2xl font-bold"
              onClick={() => setShowAdder(true)}
            >
              +
            </button>
          )}
        </div>

        {/* Table */}
        <div className="w-full rounded-lg md:rounded-2xl shadow-lg p-2 md:p-4 border-2 border-brand-primary mt-2 overflow-x-auto">
          <table className="w-full table-auto text-sm md:text-base">
            <thead>
              <tr>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold text-center">Date</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold text-center">Time</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold text-center">Status</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold text-center">Active</th>
                <th className="py-2 px-1 md:px-2 text-brand-primary text-xs md:text-lg font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {manualSchedules.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400 text-sm">
                    No schedules added yet
                  </td>
                </tr>
              ) : (
                manualSchedules.map((sched, idx) => (
                  <tr key={idx} className="hover:bg-brand-hover transition text-center">
                    <td className="py-2 px-1 md:px-2 text-xs md:text-lg">
                      {new Date(sched.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-1 md:px-2 text-xs md:text-lg">
                      {formatTime(sched.on_time)} – {formatTime(sched.off_time)}
                    </td>
                    <td className="py-2 px-1 md:px-2">
                      <span className="px-2 md:px-4 py-1 rounded-full bg-green-600 text-white font-bold text-xs md:text-base">
                        ON
                      </span>
                    </td>
                    <td className="py-2 px-1 md:px-2">
                      <input
                        type="checkbox"
                        checked={sched.checked}
                        onChange={() => toggleManualCheck(idx)}
                        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-brand-primary"
                      />
                    </td>
                    <td className="py-2 px-1 md:px-2">
                      <button
                        className="bg-red-500 px-2 md:px-3 py-1 text-white rounded shadow font-bold hover:bg-red-600 text-xs md:text-base"
                        onClick={() => deleteManualSchedule(idx)}
                      >
                        🗑
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
          <div className="bg-brand-bg rounded-lg shadow p-4 md:p-6 flex flex-col gap-4 border-2 border-brand-primary mt-4">
            {/* Time Select */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              {/* FROM */}
              <div className="w-full md:w-auto">
                <span className="text-brand-primary font-bold text-sm md:text-base">FROM</span>
                <div className="flex gap-1 md:gap-2 mt-1 justify-center">
                  <select
                    value={fromHour}
                    onChange={(e) => setFromHour(Number(e.target.value))}
                    className="bg-brand-primary text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
                  >
                    {hours.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  <span className="text-brand-text self-center">:</span>
                  <select
                    value={fromMinute}
                    onChange={(e) => setFromMinute(Number(e.target.value))}
                    className="bg-brand-primary text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
                  >
                    {minutes.map((m) => (
                      <option key={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                  </select>
                  <select
                    value={fromAMPM}
                    onChange={(e) => setFromAMPM(e.target.value)}
                    className="bg-brand-primary text-white px-2 md:px-3 py-2 rounded text-sm md:text-base"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>

              {/* TO */}
              <div className="w-full md:w-auto">
                <span className="text-brand-primary font-bold text-sm md:text-base">TO</span>
                <div className="flex gap-1 md:gap-2 mt-1 justify-center">
                  <select
                    value={toHour}
                    onChange={(e) => setToHour(Number(e.target.value))}
                    className="bg-brand-primary text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
                  >
                    {hours.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  <span className="text-brand-text self-center">:</span>
                  <select
                    value={toMinute}
                    onChange={(e) => setToMinute(Number(e.target.value))}
                    className="bg-brand-primary text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
                  >
                    {minutes.map((m) => (
                      <option key={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                  </select>
                  <select
                    value={toAMPM}
                    onChange={(e) => setToAMPM(e.target.value)}
                    className="bg-brand-primary text-white px-2 md:px-3 py-2 rounded text-sm md:text-base"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save/Cancel Row */}
            <div className="flex justify-between pt-3 md:pt-5 gap-2">
              <button
                className="bg-red-500 px-4 md:px-8 py-2 md:py-3 text-white font-bold rounded-full text-sm md:text-lg hover:bg-red-600 flex-1 md:flex-none"
                onClick={() => setShowAdder(false)}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 px-4 md:px-8 py-2 md:py-3 text-white font-bold rounded-full text-sm md:text-lg hover:bg-green-600 flex-1 md:flex-none"
                onClick={handleAddSchedule}
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