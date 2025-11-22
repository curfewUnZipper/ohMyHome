import { useState } from "react";
import "../styles/lights.css"; // Only if you have special CSS, otherwise ignore

export default function LightScheduler({ onCancel, onSave }) {
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(0);
  const [ampm, setAMPM] = useState("AM");
  const [savedTime, setSavedTime] = useState(null);

  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = Array.from({length: 60}, (_, i) => i);

  const handleSave = () => {
    const scheduled = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`;
    setSavedTime(scheduled);
    if (onSave) onSave(scheduled);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full justify-between px-10 mb-6">
        <button
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-full text-lg"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-8 py-3 bg-green-600 text-white font-bold rounded-full text-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="flex gap-8 items-center justify-center w-full mb-10">
        <div className="overflow-y-scroll h-48 w-24 flex flex-col items-center px-2 custom-scroll">
          {hours.map((h) => (
            <button
              key={h}
              className={`my-2 py-3 w-full text-2xl font-bold rounded-lg ${hour === h ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-primary"}`}
              onClick={() => setHour(h)}
            >
              {h}
            </button>
          ))}
        </div>
        <div className="text-4xl font-bold text-brand-primary">:</div>
        <div className="overflow-y-scroll h-48 w-24 flex flex-col items-center px-2 custom-scroll">
          {minutes.map((m) => (
            <button
              key={m}
              className={`my-2 py-3 w-full text-xl font-bold rounded-lg ${minute === m ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-primary"}`}
              onClick={() => setMinute(m)}
            >
              {String(m).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 ml-6">
          <button
            className={`px-5 py-2 rounded-xl font-bold text-lg ${ampm === "AM" ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-primary"}`}
            onClick={() => setAMPM("AM")}
          >AM</button>
          <button
            className={`px-5 py-2 rounded-xl font-bold text-lg ${ampm === "PM" ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-primary"}`}
            onClick={() => setAMPM("PM")}
          >PM</button>
        </div>
      </div>
      {savedTime && (
        <div className="mt-10 text-2xl font-bold text-brand-primary bg-brand-bg px-6 py-4 rounded-lg shadow-md">
          Scheduled Time: {savedTime}
        </div>
      )}
    </div>
  );
}
