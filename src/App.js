import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Me } from "./components/Me";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Container } from "@chakra-ui/layout";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <Container>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route path="/me" component={Me} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
