import { Link } from "react-router-dom";

import { Box, Center, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import {
  FormControl,
  Input,
  Checkbox,
  Button,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useInputField } from "../hooks/useInputField";
import { useFormSubmit } from "../hooks/useForm";

export function Register(props) {
  const [show, { toggle: handleTogglePassword }] = useBoolean(false);

  const [state, handleOnChange, clearFormData] = useInputField({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    acceptance: true,
  });

  const { isLoading, errors, handleFormSubmit } = useFormSubmit(
    state,
    clearFormData,
    props
  );

  console.log(props, "from api", errors);
  return (
    <>
      <Box py="16px">
        <Flex justify="center" h="100vh" align="center" direction="column">
          <Box mb="10px">Gloris Signup</Box>

          <Box
            py="20px"
            px="16px"
            bg="white"
            textAlign="center"
            rounded="24px"
            maxW="330px"
          >
            <Heading fontSize="20px" fontWeight={700} mb="12px">
              Getting Started
            </Heading>
            <Text fontSize="14px" mb="20px">
              Create an account to continue!
            </Text>
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
              <FormControl id="firstName" mb="16px" textAlign="left">
                <Input
                  type="text"
                  placeholder="Your First Name"
                  variant="filled"
                  rounded="lg"
                  isRequired
                  isInvalid={errors?.firstName}
                  errorBorderColor="red.300"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleOnChange}
                  autoFocus
                />

                {errors?.firstName && (
                  <Text color="red.600" as="small" fontSize="xs">
                    {errors?.firstName}
                  </Text>
                )}
              </FormControl>
              <FormControl id="lastName" mb="16px" textAlign="left">
                <Input
                  type="text"
                  placeholder="Your Last Name"
                  variant="filled"
                  rounded="lg"
                  isRequired
                  isInvalid={errors?.lastName}
                  errorBorderColor="red.300"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleOnChange}
                  autoFocus
                />

                {errors?.lastName && (
                  <Text color="red.600" as="small" fontSize="xs">
                    {errors?.lastName}
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
              <HStack spacing="10px" mb="24px">
                {Array(6)
                  .fill(0)
                  .map((e, i) => (
                    <Box
                      flexGrow={1}
                      key={i}
                      w="36px"
                      border="2px solid #f4f4f6"
                      rounded="2px"
                    ></Box>
                  ))}
              </HStack>
              <Box mb="20px" textAlign="left">
                <HStack spacing="14px">
                  <Checkbox
                    defaultIsChecked
                    colorScheme="blue"
                    isInvalid={false}
                    mt="-9px"
                    name={"acceptance"}
                    checked={state.acceptance}
                    onChange={handleOnChange}
                  ></Checkbox>
                  <Text fontSize="12px">
                    By creating an account, you agree to our <br />
                    <Link
                      color="blue"
                      fontWeight={700}
                      to="#terms-and-conditions"
                    >
                      Term and Conditions
                    </Link>
                  </Text>
                </HStack>
                {errors?.acceptance && (
                  <Text color="red.600" as="small" fontSize="xs">
                    {errors?.acceptance}
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
                Register
              </Button>

              <Text fontSize="13px" fontWeight={600}>
                Already have an account?{" "}
                <Link to="/login">
                  <Text color="blue" fontWeight={600} as="button">
                    Sign in
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
