import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import axios from "axios";

export const useFormSubmit = (inputFieldsState, clearFormData, router) => {
  const toast = useToast();

  const [{ data, isLoading, errors }, setData] = useState({
    data: null,
    isLoading: false,
    errors: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (inputFieldsState.rememberMe === true) {
      // perform some logic for rememberMe on the login route
    }

    if (inputFieldsState.acceptance === false) {
      setData({
        isLoading: false,
        data: null,
        errors: { ...errors, acceptance: "You must agree to T&Cs" },
      });
      return;
    }

    try {
      const isSignup = router.pathname === "/signup";

      setData((s) => ({ ...s, isLoading: true }));

      const newUser = await axios.post(
        `/client/${isSignup ? "signup" : "login"}`,
        inputFieldsState
      );

      setData((s) => ({
        ...s,
        data: newUser.data,
        isLoading: false,
        errors: null,
      }));

      toast({
        // adjust toast title for Login
        title: isSignup ? "Account created." : "Login successful",
        // adjust toast description for Login
        description: isSignup
          ? "Email verification link has been sent to you, verify your account to complete the  registration process."
          : "You can now start a project",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // the team decides about the next rendering
      router.push(isSignup ? "/login" : "/project");

      if (clearFormData) clearFormData();
    } catch (error) {
      console.error(error?.response?.data);
      if (error?.message?.toLowerCase().includes("network")) {
        toast({
          title: error.message,
          description: "Check your internet connection and try again.",
          status: "error",
          position: "top",
          isClosable: true,
        });

        setData((s) => ({
          ...s,
          data: null,
          isLoading: false,
        }));
        return;
      }

      const errors = error?.response?.data || {};

      // processErrorData
      if (errors?.message?.toLowerCase().includes("client")) {
        errors.email = errors.message;
      }
      if (errors?.message?.toLowerCase().includes("pending")) {
        errors.email = errors.message;
      }
      if (errors?.message?.toLowerCase().includes("password")) {
        errors.password = errors.message;
      }

      setData((s) => ({
        ...s,
        data: null,
        isLoading: false,
        errors,
      }));
    }
  };

  return { data, isLoading, errors, handleFormSubmit };
};
