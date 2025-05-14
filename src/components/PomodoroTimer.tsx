"use client";

import React, { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current!);
              setIsActive(false);
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes]);

  const handleStart = () => {
    if (!isActive) setIsActive(true);
  };

  const handlePause = () => {
    if (isActive) setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(60, Math.max(1, Number(e.target.value)));
    setMinutes(value);
    setSeconds(0);
  };

  return (
    <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Pomodoro Timer</h2>
      <div className="flex justify-center items-center space-x-2 mb-4">
        <input
          type="number"
          min={1}
          max={60}
          value={minutes}
          onChange={handleChangeMinutes}
          className="w-16 text-center border border-gray-300 rounded px-2 py-1"
          disabled={isActive}
        />
        <span className="text-2xl">:</span>
        <span className="text-2xl font-mono">
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      <div className="flex justify-center space-x-4">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
