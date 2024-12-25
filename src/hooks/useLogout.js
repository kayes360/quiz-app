import React from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  return () => {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/");
  };
};
