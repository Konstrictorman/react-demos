import React, { Fragment, useState, useEffect } from 'react';

function TimeBomb() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning && totalSeconds > 0) {
      intervalId = window.setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, totalSeconds]);

  const handleStart = () => {
    const total = minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setIsRunning(true);
    }
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Fragment>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{formatTime(totalSeconds)}</h1>
    </Fragment>
  );
}

export default TimeBomb;
