import { Button } from "@chakra-ui/button";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/layout";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/auth";

export const NavBar = () => {
  const { isAuthenticated, isLoading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = async (e) => {
    try {
      await axios.get("/logout");
      dispatch("LOGOUT");
    } catch (error) {}
  };

  return (
    <Box as="nav" bg="blue.800" color="white" shadow="2xl">
      <UnorderedList display="flex" justifyContent="space-between" mx="8px">
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        {!isLoading && (
          <Flex justify="space-between" flexBasis="30%">
            {!isAuthenticated ? (
              <>
                <ListItem>
                  <Link to="/register">Signup</Link>
                </ListItem>
                <ListItem>
                  <Link to="/login">Login</Link>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Link to="/me">Me</Link>
                </ListItem>
                <Button onClick={logout} colorScheme="gray" variant="link">
                  Logout
                </Button>
              </>
            )}
          </Flex>
        )}
      </UnorderedList>
    </Box>
  );
};
