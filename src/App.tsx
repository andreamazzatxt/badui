import { useState, useCallback } from "react";
import SnakeGame from "./snake-game";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setInputValue("");
  }, [isPlaying]);

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
      <h1 className="text-2xl font-bold mb-4">Username</h1>
      <input
        type="text"
        className="w-40"
        style={{ border: "1px solid grey" }}
        placeholder="Username"
      />
      <h1 className="text-2xl font-bold mb-4">Password</h1>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="password"
          value={inputValue}
          readOnly
          className="w-40"
          style={{ border: "1px solid grey" }}
          placeholder="Your password"
          onClick={handleStartGame}
          onFocus={handleStartGame}
        />

        {!!inputValue && !isPlaying && (
          <button onClick={() => alert("Wrong password!!! " + inputValue)}>
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
