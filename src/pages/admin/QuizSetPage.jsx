import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth"; 
export default function QuizSetPage() {
  const { api } = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm(); 

  const submitQuizSetForm = async (formData) => {
    const quizSetId = crypto.randomUUID()
    formData = {
      ...formData,
      id: quizSetId,
      draft: true,
    };
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/`,
        formData
      );  
       if (response.status === 201) {
        navigate(`/admin/quizsetentry/${quizSetId}`);
       }
    } catch (error) {
      console.error(
        "Error creating quiz set:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* <!-- Left Column --> */}
      <div>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to home
        </Link>

        <h2 className="text-3xl font-bold mb-6">
          Give your quiz title and description
        </h2>

        <form onSubmit={handleSubmit(submitQuizSetForm)}>
          <div className="mb-4">
            <InputField
              label="Quiz title"
              htmlFor="quiz-title"
              error={errors.title}
            >
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Quiz title"
                {...register("title", {
                  required: "Quiz Title  is required",
                })}
              />
            </InputField>
          </div>

          <div className="mb-6">
            <InputField label="Description (Optional)" htmlFor="description">
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Description"
                {...register("description")}
              ></textarea>
            </InputField>
          </div>

          <button className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
