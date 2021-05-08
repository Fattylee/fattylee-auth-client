import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Me } from "./components/Me";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/layout";

function App() {
  return (
    <Router>
      <div>
        <Box as="nav">
          <UnorderedList display="flex" justifyContent="space-between">
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
            <Flex justify="space-between" sflexGrow="1" flexBasis="30%">
              <ListItem>
                <Link to="/register">Signup</Link>
              </ListItem>
              <ListItem>
                <Link to="/login">Login</Link>
              </ListItem>
              <ListItem>
                <Link to="/users">Users</Link>
              </ListItem>
            </Flex>
          </UnorderedList>
        </Box>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login" component={Login} />

          <Route path="me">
            <Me />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
