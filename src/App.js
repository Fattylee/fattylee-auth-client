import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Me } from "./components/Me";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Container, Square, Text } from "@chakra-ui/layout";
import { NavBar } from "./components/NavBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRoute } from "./components/AuthRoute";

function App() {
  return (
    <Container textAlign="center">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <AuthRoute path="/register" component={Register} />

          <AuthRoute path="/login" component={Login} />

          <ProtectedRoute path="/me" component={Me} />
          <Route
            path="*"
            render={() => (
              <Square>
                <Text>Not Found</Text>
              </Square>
            )}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
