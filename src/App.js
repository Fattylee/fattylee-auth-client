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
        <Box as="nav" bg="blue.800" color="white" shadow="2xl">
          <UnorderedList display="flex" justifyContent="space-between" mx="8px">
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
            <Flex justify="space-between" flexBasis="30%">
              <ListItem>
                <Link to="/register">Signup</Link>
              </ListItem>
              <ListItem>
                <Link to="/login">Login</Link>
              </ListItem>
              <ListItem>
                <Link to="/me">Me</Link>
              </ListItem>
            </Flex>
          </UnorderedList>
        </Box>

        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route path="/me" component={Me} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
