import { useState, useEffect, useRef } from "react";

export default function BrewTimer({ targetTime = "4:00" }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const [targetMin, targetSec] = targetTime.split(":").map(Number);
  const targetSeconds = targetMin * 60 + targetSec;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (elapsed >= targetSeconds && running) {
      setRunning(false);
    }
  }, [elapsed, targetSeconds, running]);

  function reset() {
    setRunning(false);
    setElapsed(0);
  }

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const progress = Math.min(elapsed / targetSeconds, 1);
  const isDone = elapsed >= targetSeconds;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="brew-timer">
      <div className="timer-ring-wrap">
        <svg className="timer-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="ring-track" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className={`ring-fill ${isDone ? "ring-done" : ""}`}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>
        <div className="timer-display">
          <span className="timer-elapsed">{fmt(elapsed)}</span>
          <span className="timer-target">/ {targetTime}</span>
        </div>
      </div>

      {isDone && <p className="timer-done-msg">☕ Brew complete!</p>}

      <div className="timer-controls">
        <button
          className={`timer-btn ${running ? "pause" : "play"}`}
          onClick={() => setRunning((r) => !r)}
          disabled={isDone}
        >
          {running ? "⏸ Pause" : isDone ? "Done" : elapsed > 0 ? "▶ Resume" : "▶ Start"}
        </button>
        <button className="timer-btn reset" onClick={reset}>
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
