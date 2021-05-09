import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

import axios from "axios";
import { AuthProvider } from "./context/auth";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN + "/api/v1";
axios.defaults.withCredentials = true;

function Root({ Component }) {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Root Component={App} />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
