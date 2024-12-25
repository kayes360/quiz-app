import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const submitForm = async (formData) => {
    if (formData.admin) {
      formData = { ...formData, role: "admin" };
    }

    try {  
      const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,formData); 
        if (response.status === 201) {
            navigate("/login");
        }
        
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error.response.data.error}  `,
      });
    }
  };
  return (
    <form className="" onSubmit={handleSubmit(submitForm)}>
      <div className="">
        <InputField label="Full Name" htmlFor={name} error={errors.full_name}>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="John Doe"
            name="full_name"
            {...register("full_name", { required: "Please enter full name" })}
          />
        </InputField>

        <InputField label="Email " htmlFor="email" error={errors.email}>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Enter Email"
            name="email"
            {...register("email", { required: "Please enter email " })}
          />
        </InputField>
      </div>

      <div className="flex  gap-4">
        <InputField
          label="Password "
          htmlFor="password"
          error={errors.password}
        >
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Enter Password"
            name="password"
            {...register("password", { required: "Please enter password " })}
          />
        </InputField>

        <InputField
          label="Confirm Password "
          htmlFor="Confirm Password"
          error={errors.confirmpassword}
        >
          <input
            type="password"
            id="confirmpassword"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Please Re-Enter Password"
            name="confirmpassword"
            {...register("confirmPassword", {
              required: "Please retype the password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
        </InputField>
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          name="admin"
          {...register("admin")}
        />
        <label htmlFor="admin" className="block ">
          Register as Admin
        </label>
      </div>
      <p>{errors?.root?.random?.message}</p>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
}
