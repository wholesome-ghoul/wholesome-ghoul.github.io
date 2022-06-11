import React from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // console.error(e);
      return initialValue;
    }
  });

  const setValue = (value: string | ((s: string) => string)) => {
    try {
      value = typeof value === "function" ? value(state) : value;
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // console.error(e);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
