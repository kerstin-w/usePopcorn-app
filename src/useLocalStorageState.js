import { useState, useEffect } from "react";

/**
 * The `useLocalStorageState` function is a custom React hook that allows you to store and retrieve
 * state in the local storage of the browser.
 * @param initalState - The `initalState` parameter in the `useLocalStorageStage` function represents
 * the initial value that will be used if there is no stored value in the localStorage for the
 * specified key. It is the default value that will be used when the component first mounts or when the
 * localStorage value is not available.
 * @param key - The `key` parameter is a unique identifier used to store and retrieve the value from
 * the local storage. It helps in associating the stored value with a specific key for easy retrieval.
 * @returns The `useLocalStorageStage` custom hook is returning an array with two elements: the current
 * value stored in local storage and a function to update that value.
 */
export function useLocalStorageState(initalState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initalState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
