import { useEffect } from "react";

/**
 * The `useKey` function allows to trigger a specific action when a specified key is
 * pressed.
 * @param key - The `key` parameter represents the keyboard key that will trigger the `action` when
 * pressed. It is case-insensitive and should be a string representing the key code or name (e.g.,
 * "Enter", "Escape", "Space", "ArrowUp", etc.).
 * @param action - The `action` parameter in the `useKey` function is a function that will be called
 * when the specified `key` is pressed.
 * @returns The `useKey` function returns a cleanup function that removes the event listener for the
 * specified key when the component unmounts or when the dependencies `[action, key]` change.
 */
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
