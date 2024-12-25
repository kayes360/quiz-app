import React, { useEffect, useReducer, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import QuizSetCard from "./QuizSetCard";
import { initialState, quizSetReducer } from "../../reducers/QuizSetReducer";
import { actions } from "../../actions";
export default function Dashboard() {
  const { auth } = useAuth();
  const { api } = useAxios();
  // console.log(auth)
  const [state, dispatch] = useReducer(quizSetReducer, initialState);

  useEffect(() => {
    const fetchQuizSets = async () => {
      dispatch({ type: actions.quiz_set.QUIZ_SET_LOADING });

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        ); 
        if (response.status === 200) {
          dispatch({
            type: actions.quiz_set.QUIZ_SET_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.quiz_set.QUIZ_SET_ERROR,
          error: error.message,
        });
      }
    };
    fetchQuizSets();
  }, []);

  const handleDeleteQuizSet = async (quizSetId) => {
    // console.log('dlete', quizSetId)
    dispatch({ type: actions.quiz_set.QUIZ_SET_LOADING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.quiz_set.QUIZ_SET_DELETED,
          id: quizSetId,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.quiz_set.QUIZ_SET_ERROR,
        error: error.message,
      });
    }
  };
  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> An error occures...</div>;
  }

  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  ">
        <Link to="/admin/quizsetpage" className="group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              Create a new quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Build from the ground up
            </p>
          </div>
        </Link>

        {state?.quizSet && state?.quizSet.length > 0
          ? state?.quizSet.map((set) => (
              <QuizSetCard
                key={set.id}
                set={set}
                onDelete={handleDeleteQuizSet}
              />
            ))
          : ""}
      </div>
    </>
  );
}
