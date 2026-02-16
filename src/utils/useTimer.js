import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for countdown timer
 * @param {number} initialSeconds - Initial time in seconds
 * @param {boolean} isRunning - Whether timer should run
 * @returns {object} { seconds, formattedTime, reset, isExpired }
 */
export function useTimer(initialSeconds = 0, isRunning = false) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const next = prev - 1;
          return next < 0 ? 0 : next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const reset = (newSeconds = initialSeconds) => {
    setSeconds(newSeconds);
  };

  return {
    seconds,
    formattedTime: formatTime(seconds),
    reset,
    isExpired: seconds === 0 && isRunning,
  };
}
