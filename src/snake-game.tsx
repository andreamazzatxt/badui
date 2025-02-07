import React, { useEffect, useCallback } from "react";
import useSnakeGame from "./use-snake-game";

interface SnakeGameProps {
  onGameEnd: () => void;
  onNumberCaught: (number: number | string) => void;
}

const GRID_SIZE = 20;

function SnakeGame({ onGameEnd, onNumberCaught }: SnakeGameProps) {
  const { snake, foods, direction, setDirection } = useSnakeGame(
    GRID_SIZE,
    onNumberCaught,
    onGameEnd
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const [dx, dy] = direction;
      const [headX, headY] = snake[0];
      let newDirection: [number, number] | null = null;

      switch (e.key) {
        case "ArrowUp":
          if (dy !== 1) newDirection = [0, -1];
          break;
        case "ArrowDown":
          if (dy !== -1) newDirection = [0, 1];
          break;
        case "ArrowLeft":
          if (dx !== 1) newDirection = [-1, 0];
          break;
        case "ArrowRight":
          if (dx !== -1) newDirection = [1, 0];
          break;
      }

      if (newDirection) {
        const [newDx, newDy] = newDirection;
        const newHeadX = headX + newDx;
        const newHeadY = headY + newDy;
        if (
          !snake.some(
            (segment) => segment[0] === newHeadX && segment[1] === newHeadY
          )
        ) {
          setDirection(newDirection);
        }
      }
    },
    [direction, snake, setDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const getCellContent = (x: number, y: number) => {
    if (snake.some((segment) => segment[0] === x && segment[1] === y)) {
      return <div className="w-full h-full bg-green-500 rounded-sm"></div>;
    }
    const food = foods.find((food) => food[0] === x && food[1] === y);
    if (food) {
      return (
        <div className="w-full h-full bg-red-500 rounded-sm flex items-center justify-center text-white font-bold">
          {food[2]}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "1px",
          border: "1px solid #ccc",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          return (
            <div key={index} className="w-full h-full">
              {getCellContent(x, y)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SnakeGame);
