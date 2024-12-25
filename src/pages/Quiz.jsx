import React, { useEffect, useState } from "react";
import Avatar from "../assets/avater.webp";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import QuizQuestions from "./QuizQuestions";

export default function Quiz() {
  const { quizId } = useParams();
  const { api } = useAxios();

  const [quiz, setQuiz] = useState(null); // Store quiz details
  const [loading, setLoading] = useState(true); // Loading status
  const [error, setError] = useState(null); // Error handling
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [attemptedQuestionsCount, setAttemptedQuestionsCount] = useState(0); // Track attempted questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user answers
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}`
        );
        if (response.status === 200) {
          setQuiz(response.data.data);
        } else {
          throw new Error("Failed to fetch quiz details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, api]);
 
  

  if (loading) return <div>Loading quiz details...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAttemptedQuestionsCount(attemptedQuestionsCount + 1); // Increment attempted count
    } else if (currentQuestionIndex === quiz.questions.length - 1) {
      handleSubmitQuiz(); // Submit quiz on last question
    }
  };

  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    const payload = {
      answers: selectedAnswers,
    };
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempt`,
        payload
      );
      if (response.status === 200) {
        const { quiz, percentage, correct_answers, submitted_answers } =
          response.data.data; 
        navigate(`/result/${quizId}`, {
          state: { quiz, percentage, correct_answers, submitted_answers },
        });
      }
    } catch (err) {
      console.error("Error submitting quiz:", err.message);
    }
  };

  return (
    <div className="container mx-auto py-3" >
      <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          {/* Left Column */}
          <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
            <div>
              <h2 className="text-4xl font-bold mb-4">{quiz?.title}</h2>
              <p className="text-gray-600 mb-4">{quiz?.description}</p>
              <div className="flex flex-col">
                <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Total number of questions: {quiz?.stats?.total_questions}
                </div>
                <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Participation: {attemptedQuestionsCount}
                </div>
                <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Remaining:{" "}
                  {quiz?.stats?.total_questions - currentQuestionIndex - 1}
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center">
              <img
                src={Avatar}
                alt="Mr Hasan"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <span className="text-black font-semibold">Saad Hasan</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 bg-white">
            <div className="bg-white p-6 !pb-2 rounded-md">
              {currentQuestion ? (
                <QuizQuestions
                  question={currentQuestion}
                  onNext={handleNextQuestion}
                  isLast={currentQuestionIndex === quiz.questions.length - 1}
                  onAnswer={handleAnswer}
                />
              ) : (
                <div>All questions answered!</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
