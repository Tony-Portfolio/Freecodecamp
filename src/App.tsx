import { useState, useEffect, useRef } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalID, setIntervalID] = useState<number>(null!);

  const audioRef = useRef<HTMLAudioElement>(null!);


  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.play();
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, sessionLength, breakLength]);

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalID);
      setIsRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalID(id);
      setIsRunning(true);
    }
  };

  const reset = () => {
    clearInterval(intervalID);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
  };
  

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 space-y-4 w-96">
        <h1 className="text-2xl text-center font-semibold">25 + 5 Clock</h1>
        <div className="flex justify-between">
          <div className="w-1/2 text-center">
            <h2 id="break-label" className="text-xs">Break Length</h2>
            <div className="flex items-center">
              <button
                id="break-decrement"
                onClick={decrementBreak}
                className="text-2xl p-1"
              >
                -
              </button>
              <span id="break-length" className="text-2xl mx-4">
                {breakLength}
              </span>
              <button
                id="break-increment"
                onClick={incrementBreak}
                className="text-2xl p-1"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-1/2 text-center">
            <h2 id="session-label" className="text-xs">Session Length</h2>
            <div className="flex items-center">
              <button
                id="session-decrement"
                onClick={decrementSession}
                className="text-2xl p-1"
              >
                -
              </button>
              <span id="session-length" className="text-2xl mx-4">
                {sessionLength}
              </span>
              <button
                id="session-increment"
                onClick={incrementSession}
                className="text-2xl p-1"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 id="timer-label" className="text-xl">{timerLabel}</h2>
          <div id="time-left" className="text-4xl mt-2">
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            id="start_stop"
            onClick={startStop}
            className={`w-20 h-10 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isRunning ? "hover:bg-red-500" : "hover:bg-green-500"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            id="reset"
            onClick={reset}
            className="w-20 h-10 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 hover:bg-red-600"
          >
            Reset
          </button>
        </div>
        <audio
          id="beep"
          ref={audioRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
