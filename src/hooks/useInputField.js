import { useState } from "react";

export const useInputField = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleOnChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const clearFormData = () => {
    setState(initialState);
  };

  return [state, handleOnChange, clearFormData];
};
