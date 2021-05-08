import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  isLoading: true,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: false,
        user: payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error(`Unknown action type: "${type}"`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatchWrapper] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  const dispatch = (type, payload) => dispatchWrapper({ type, payload });

  useEffect(() => {
    const loginUser = async () => {
      try {
        const { data } = await axios.get("/me");
        dispatch("LOGIN", data);
      } catch (error) {
        dispatch("LOGOUT");
      }
    };
    loginUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(DispatchContext);
