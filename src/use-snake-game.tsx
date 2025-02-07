"use client";

import { useState, useEffect, useCallback } from "react";

export default function useSnakeGame(
  gridSize: number,
  catchNumber: (number: number | string) => void,
  onGameEnd: () => void
) {
  const [snake, setSnake] = useState<[number, number][]>([
    [Math.floor(gridSize / 2), Math.floor(gridSize / 2)],
  ]);
  const [foods, setFoods] = useState<[number, number, number | string][]>([]);
  const [direction, setDirection] = useState<[number, number]>([1, 0]);

  const generateFood = useCallback((): [number, number, number | string] => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return [x, y, -1];
  }, [gridSize]);

  const shuffleFood = useCallback(() => {
    const numbers: (number | string)[] = Array.from({ length: 36 }, (_, i) => {
      if (i < 10) return i;
      return String.fromCharCode(65 + i - 10);
    });
    const initialFoods = numbers.map(() => generateFood());
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    setFoods(
      initialFoods.map((food, index) => [
        food[0],
        food[1],
        shuffledNumbers[index],
      ])
    );
  }, [generateFood]);

  useEffect(() => {
    shuffleFood();
  }, [shuffleFood]);

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = [
          (prevSnake[0][0] + direction[0] + gridSize) % gridSize,
          (prevSnake[0][1] + direction[1] + gridSize) % gridSize,
        ] as [number, number];

        const foodIndex = foods.findIndex(
          (food) => food[0] === newHead[0] && food[1] === newHead[1]
        );

        if (foodIndex !== -1) {
          const [, , value] = foods[foodIndex];
          console.log(value);
          catchNumber(value);
          shuffleFood();
          return [newHead, ...prevSnake];
        }

        if (
          prevSnake.some(
            (segment) => segment[0] === newHead[0] && segment[1] === newHead[1]
          )
        ) {
          onGameEnd();
          return prevSnake;
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    };

    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [catchNumber, direction, foods, gridSize, onGameEnd, shuffleFood]);

  return { snake, foods, direction, setDirection };
}
