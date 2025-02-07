import { useState, useCallback } from "react";
import SnakeGame from "./snake-game";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = useCallback(() => {
    setIsPlaying(true);
    setInputValue("");
  }, []);

  const handleGameEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleNumberCaught = useCallback((number: number | string) => {
    if (number === "<") {
      setInputValue((prev) => prev.slice(0, -1));
      return;
    }

    setInputValue((prev) => prev + number);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Insert your phone number</h1>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={inputValue}
          readOnly
          className="w-40"
          placeholder="Your number"
        />
        <button onClick={handleStartGame} disabled={isPlaying}>
          {isPlaying ? "inserting..." : inputValue ? "Change" : "Start"}
        </button>

        {!!inputValue && (
          <button onClick={() => alert("Calling ... " + inputValue)}>
            Confirm
          </button>
        )}
      </div>
      <div className="w-full max-w-md">
        {isPlaying && (
          <SnakeGame
            onGameEnd={handleGameEnd}
            onNumberCaught={handleNumberCaught}
          />
        )}
      </div>
    </div>
  );
}
