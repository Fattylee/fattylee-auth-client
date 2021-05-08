import { Link } from "react-router-dom";

import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useInputField } from "../hooks/useInputField";
import { useFormSubmit } from "../hooks/useForm";
import { useAuthState } from "../context/auth";

export function Login(props) {
  const { isAuthenticated } = useAuthState();
  if (isAuthenticated) props.history.push("/me");

  const [show, { toggle: handleTogglePassword }] = useBoolean(false);

  const [state, handleOnChange, clearFormData] = useInputField({
    email: "",
    password: "",
  });

  const { isLoading, errors, handleFormSubmit } = useFormSubmit(
    state,
    clearFormData,
    props
  );

  return (
    <>
      <Box bgColor="#f1f6f8" py="16px">
        <Flex justify="center" h="100vh" align="center" direction="column">
          <Box mb="10px">Gloris Login</Box>

          <Box
            py="40px"
            px="16px"
            bg="white"
            textAlign="center"
            rounded="24px"
            maxW="330px"
            shadow="lg"
          >
            <Heading fontSize="20px" fontWeight={700} mb="12px">
              Welcome back!
            </Heading>

            <form onSubmit={handleFormSubmit}>
              <FormControl id="email" mb="16px" textAlign="left">
                <Input
                  type="email"
                  placeholder="Your Email"
                  variant="filled"
                  rounded="lg"
                  isRequired
                  isInvalid={errors?.email}
                  errorBorderColor="red.300"
                  name="email"
                  value={state.email}
                  onChange={handleOnChange}
                  autoFocus
                />

                {errors?.email && (
                  <Text color="red.600" as="small" fontSize="xs">
                    {errors?.email}
                  </Text>
                )}
              </FormControl>

              <Box mb="16px" textAlign="left">
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Create Password"
                    rounded="lg"
                    isRequired
                    isInvalid={errors?.password}
                    errorBorderColor="red.300"
                    name="password"
                    value={state.password}
                    onChange={handleOnChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Center
                      cursor="pointer"
                      color="gray.400"
                      paddingTop="4px"
                      onClick={handleTogglePassword}
                    >
                      {!show ? (
                        <ViewIcon size="23px" />
                      ) : (
                        <ViewOffIcon size="23px" />
                      )}
                    </Center>
                  </InputRightElement>
                </InputGroup>
                {errors?.password && (
                  <Text color="red.600" as="small" fontSize="xs">
                    {errors?.password}
                  </Text>
                )}
              </Box>

              <Button
                isLoading={isLoading}
                isFullWidth
                size="lg"
                colorScheme="blue"
                bg="blue"
                mb="6px"
                type="submit"
              >
                Login
              </Button>

              <Text fontSize="13px" fontWeight={600}>
                Don't have an account?{" "}
                <Link to="/register">
                  <Text color="blue" fontWeight={600} as="button">
                    Create Account
                  </Text>
                </Link>
              </Text>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
