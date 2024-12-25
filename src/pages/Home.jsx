import React, { useEffect, useReducer } from "react";
import Avatar from "../assets/avater.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { initialState, quizSetReducer } from "../reducers/QuizSetReducer";
import { actions } from "../actions";

export default function Home() {
  const { auth } = useAuth();
  const { api } = useAxios();

  const [state, dispatch] = useReducer(quizSetReducer, initialState);

  useEffect(() => {
    const fetchQuizSets = async () => {
      dispatch({ type: actions.quiz_set.QUIZ_SET_LOADING });

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`
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
  }, [api]);
 
 
  return (
    <>
      {auth?.user && (
        <div className="text-center mb-12">
          <img
            src={Avatar}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
          />
          <p className="text-xl text-gray-600">Welcome</p>
          <h2 className="text-4xl font-bold text-gray-700 jaro-font">
            {auth?.user?.full_name}
          </h2>
        </div>
      )}

      <section>
        <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {state?.quizSet?.data?.map((quiz) => (
            <Link
            to={quiz?.is_attempted ? `/result/${quiz.id}` : `/quiz/${quiz.id}`}
            key={quiz.id}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
          >
              <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
                <p className="mt-2">{quiz.description}</p>
              </div>
              <img
                src={quiz.thumbnail || "default-thumbnail.jpg"}
                alt={quiz.title}
                className="w-full h-full object-cover rounded"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
