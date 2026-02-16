import { useEffect, useState } from 'react';
import { useTimer } from '../utils/useTimer';

function Timer({ duration = 0, isRunning: externalIsRunning = false, onExpired, onReset }) {
  const [internalRunning, setInternalRunning] = useState(externalIsRunning);
  const [currentDuration, setCurrentDuration] = useState(duration);
  
  // Stop when either parent says stop (e.g. correct answer) or user clicked Stop
  const isRunning = externalIsRunning && internalRunning;
  
  const { seconds, formattedTime, isExpired, reset } = useTimer(currentDuration, isRunning);

  // Update duration when prop changes
  useEffect(() => {
    if (duration !== currentDuration && duration > 0) {
      setCurrentDuration(duration);
      reset(duration);
    }
  }, [duration, currentDuration, reset]);

  // Sync internal running state with external prop (e.g. when parent stops on correct answer)
  useEffect(() => {
    setInternalRunning(externalIsRunning);
  }, [externalIsRunning]);

  useEffect(() => {
    if (isExpired && onExpired) {
      onExpired();
    }
  }, [isExpired, onExpired]);

  const handleStop = () => {
    setInternalRunning(false);
  };

  const handleResume = () => {
    if (seconds > 0) {
      setInternalRunning(true);
    }
  };

  const handleReset = () => {
    setInternalRunning(true);
    reset(currentDuration);
    if (onReset) {
      onReset();
    }
  };

  const getTimeColor = () => {
    if (!isRunning || currentDuration === 0) return 'inherit';
    const percentage = seconds / currentDuration;
    if (percentage < 0.2) return '#e53e3e'; // Red when less than 20% remaining
    if (percentage < 0.5) return '#d69e2e'; // Yellow when less than 50% remaining
    return 'inherit';
  };

  return (
    <div className="timer">
      <h3>Timer</h3>
      <span className="timer-display" style={{ color: getTimeColor() }}>
        {formattedTime}
      </span>
      {isExpired && <p className="timer-expired">Time's up!</p>}
      
      {currentDuration > 0 && (
        <div className="timer-controls">
          {isRunning ? (
            <button 
              type="button" 
              className="timer-btn timer-btn-stop"
              onClick={handleStop}
            >
              Stop
            </button>
          ) : (
            <button 
              type="button" 
              className="timer-btn timer-btn-resume"
              onClick={handleResume}
              disabled={seconds === 0}
            >
              Resume
            </button>
          )}
          <button 
            type="button" 
            className="timer-btn timer-btn-reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Timer;
