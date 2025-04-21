import { useEffect, useState } from "react";
export function useLocalStorageState(init, key) {
  const [value, setValue] = useState(function () {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : init;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
