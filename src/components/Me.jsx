import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { useAuthState } from "../context/auth";

export const Me = (props) => {
  const { user } = useAuthState();

  const { email, firstName, lastName } = user || {};

  return (
    <Box mx="8px">
      <Heading>Me Route</Heading>
      <Text>Email: {email}</Text>
      <Text>First name: {firstName}</Text>
      <Text>Last name: {lastName}</Text>
    </Box>
  );
};
