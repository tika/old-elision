import { useState, useEffect, useCallback } from "react";

// Courtesy of https://usehooks.com/useKeyPress/
export function useKeyPress(...targetKeys: string[]): boolean {
  // State for keeping track of whether key is pressed
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ key }: KeyboardEvent): void => {
      // Add every key to the array unless it's already there
      if (!keysPressed.includes(key)) {
        setKeysPressed((keysPressed) => [...keysPressed, key]);
      }
    },
    [keysPressed, setKeysPressed]
  );

  // If released key is our target key then set to false
  const upHandler = useCallback(
    ({ key }: KeyboardEvent): void => {
      // Remove the key from the array if it's there
      setKeysPressed((keysPressed) =>
        keysPressed.filter((pressedKey) => pressedKey !== key)
      );
    },
    [setKeysPressed]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  // Return whether all keys are pressed
  return targetKeys.every((targetKey) => keysPressed.includes(targetKey));
}
