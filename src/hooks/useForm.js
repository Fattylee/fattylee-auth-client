import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import axios from "axios";
import { useAuthDispatch } from "../context/auth";

export const useFormSubmit = (inputFieldsState, clearFormData, router) => {
  const toast = useToast();
  const dispatch = useAuthDispatch();

  const [{ data, isLoading, errors }, setData] = useState({
    data: null,
    isLoading: false,
    errors: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (inputFieldsState.acceptance === false) {
      setData({
        isLoading: false,
        data: null,
        errors: { ...errors, acceptance: "You must agree to T&Cs" },
      });
      return;
    }

    try {
      const isRegister = router?.history?.location?.pathname === "/register";

      setData((s) => ({ ...s, isLoading: true }));

      const newUser = await axios.post(
        `/${isRegister ? "register" : "login"}`,
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
        title: isRegister ? "Account created." : "Login successful",
        // adjust toast description for Login
        description: isRegister
          ? "You can login to your account"
          : "You can now start a project",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router?.history?.push(isRegister ? "/login" : "/");

      if (!isRegister) dispatch("LOGIN", newUser?.data);

      if (clearFormData) clearFormData();
    } catch (error) {
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
