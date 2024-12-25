import { useEffect, useRef } from "react";
import { api } from "../api";
import axios from "axios";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  const authRef = useRef(auth); // Ref to hold the latest auth state

  useEffect(() => {
    authRef.current = auth; // Update the ref whenever auth changes
  }, [auth]);

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const accessToken = authRef.current?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = authRef.current?.refreshToken;

            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { accessToken } = response.data.data;

            // Update both the auth state and the ref
            setAuth((prev) => {
              const updatedAuth = { ...prev, accessToken };
              authRef.current = updatedAuth; // Update the ref
              return updatedAuth;
            });

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest); // Retry the original request
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { api };
};

export default useAxios;
