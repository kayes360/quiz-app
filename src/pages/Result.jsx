import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import  logoWhite  from '../assets/logo-white.svg'
import  CircularProgressBar  from '../assets/icons/circular-progressbar.svg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ResultQuestions from './ResultQuestions';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';


export default function Result() {
  
    const { quizId } = useParams();
    const { api } = useAxios();
    const { auth } = useAuth();

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`);
        if (response.status === 200) {
          setQuizData(response.data.data);
        } else {
          throw new Error('Failed to fetch quiz data');
        } 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, api]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { quiz, attempts } = quizData;
  const myAttempt = attempts.find((attempt) => attempt.user.id === auth.user.id);
 
  const { submitted_answers, correct_answers } = myAttempt;

    const totalCorrect = submitted_answers.reduce((count, submitted) => {
        const isCorrect = correct_answers.some(
          (correct) =>
            correct.question_id === submitted.question_id &&
            correct.answer === submitted.answer
        );
        return isCorrect ? count + 1 : count;
      }, 0);
    
      const totalWrong = submitted_answers.length - totalCorrect;
    
      const totalMarks = submitted_answers.reduce((marks, submitted) => {
        // Find the correct answer for this question
        const correctAnswer = correct_answers.find(
          (correct) =>
            correct.question_id === submitted.question_id &&
            correct.answer === submitted.answer
        );
      
        // Add marks if the answer is correct
        return marks + (correctAnswer?.marks || 0);
      }, 0);
      const percentage = ((totalMarks / quiz.total_marks) * 100).toFixed(2);

    
  return (
    <div className="flex min-h-screen overflow-hidden">
        <Link to="/">
        <img src={logoWhite} className="max-h-11 fixed left-6 top-6 z-50" />
        </Link>
    
    {/* <!-- Left side --> */}
    <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">
                {quiz?.title}
            </h2>
             
          </div>

          <div className="my-6 flex items-center  ">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">{submitted_answers.length}</p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{totalCorrect}</p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{totalWrong}</p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link to={`/leaderboard/${quizId}`}
                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                View Leaderboard
              </Link>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">{totalMarks}/{quiz?.total_marks}</p>
                <p>Your Mark</p>
              </div>
              <div style={{ width: 100, height: 100 }}> 
                
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ResultQuestions submitted_answers={submitted_answers}   correct_answers={correct_answers} />




  </div>
  )
} 