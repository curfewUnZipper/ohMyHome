import { useState, useRef } from "react";

export default function LightTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  function startTimer() {
    const totalSeconds = minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsActive(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(null);
    setIsActive(false);
  }

  // Timer UI
  return (
    <div className="flex flex-col items-center gap-6 w-full py-8">
      <h3 className="text-2xl font-bold text-brand-primary mb-2">Set Light Timer</h3>
      <div className="flex gap-6 items-center">
        <div>
          <span className="text-lg font-bold text-brand-primary">Minutes</span>
          <input
            type="number"
            min="0"
            max="59"
            className="ml-2 px-3 py-2 rounded bg-brand-bg text-brand-text text-lg w-20 text-center font-bold"
            value={minutes}
            disabled={isActive}
            onChange={e => setMinutes(Number(e.target.value))}
          />
        </div>
        <div>
          <span className="text-lg font-bold text-brand-primary">Seconds</span>
          <input
            type="number"
            min="0"
            max="59"
            className="ml-2 px-3 py-2 rounded bg-brand-bg text-brand-text text-lg w-20 text-center font-bold"
            value={seconds}
            disabled={isActive}
            onChange={e => setSeconds(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex gap-6">
        {!isActive ? (
          <button
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-full text-lg"
            onClick={startTimer}
          >
            Start Timer
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-full text-lg"
            onClick={resetTimer}
          >
            Reset
          </button>
        )}
      </div>
      {timeLeft !== null && (
        <div className="mt-4 text-xl font-bold text-brand-primary">
          Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
        </div>
      )}
      <div className="text-lg mt-3 text-brand-primary font-bold">
        {isActive ? "Light is ON" : timeLeft === 0 && "Light is OFF"}
      </div>
    </div>
  );
}
