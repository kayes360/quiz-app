import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import { api } from "../../api";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = async (formData) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { tokens, user } = response?.data?.data;
        
        if (tokens) {  
          const accessToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          setAuth({ user, accessToken, refreshToken });

          if (user?.role === "user") {
            navigate("/");
          } else if (user?.role === "admin") {
            navigate("/admin/dashboard");
          }
        }
      }
    } catch (error) { 
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error?.response?.statusText}  `,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <InputField label=" Email" htmlFor="email" error={errors.email}>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Email   address"
            {...register("email", {
              required: "Email  is required",
            })}
          />
        </InputField>
      </div>

      <div className="mb-6">
        <InputField label="Password" htmlFor="password" error={errors.password}>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </InputField>
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          {...register("admin")}
        />
        <label htmlFor="admin" className="block">
          Login as Admin
        </label>
      </div>

      {errors?.root?.random && (
  <p className="text-red-600">{errors.root.random.message}</p>
)}

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
}
