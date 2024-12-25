import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import LeaderBoardItem from "../components/LeaderBoardItem";
import Avatar from "../assets/avater.webp";

export default function LeaderBoard() {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { quizId } = useParams();
  console.log("auth", auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    position: 0,
    marks: 0,
    correct: 0,
    wrong: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`
        );

        if (response.status === 200) {
          const { attempts } = response.data.data;

          // Prepare leaderboard data with tie-aware ranking
          const sortedAttempts = attempts
            .map((attempt) => ({
              userId: attempt.user.id,
              name: attempt.user.full_name,
              marks: attempt.correct_answers.reduce(
                (sum, answer) => sum + answer.marks,
                0
              ),
            }))
            .sort((a, b) => b.marks - a.marks); // Sort by marks in descending order

          // Assign ranks with ties handled
          const leaderboardWithRank = [];
          let currentRank = 1;

          sortedAttempts.forEach((attempt, index) => {
            if (index > 0 && attempt.marks < sortedAttempts[index - 1].marks) {
              currentRank = index + 1; // Update rank if marks are lower
            }
            leaderboardWithRank.push({
              ...attempt,
              rank: currentRank,
            });
          });

          setLeaderboard(leaderboardWithRank);

          // Find the logged-in user's attempt
          const userAttempt = attempts.find(
            (attempt) => attempt.user.id === auth.user.id
          );

          if (userAttempt) {
            const correctCount = userAttempt.correct_answers.length;
            const totalMarks = userAttempt.correct_answers.reduce(
                (sum, answer) => sum + (answer.marks || 0),
                0
              );
            const wrongCount =
              userAttempt.submitted_answers.length - correctCount;

            const position = leaderboardWithRank.find(
              (entry) => entry.userId === auth.user.id
            )?.rank;

            setUserData({
              name: userAttempt.user.full_name,
              position,
              marks: totalMarks,
              correct: correctCount,
              wrong: wrongCount,
            });
          }
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
  }, [quizId, api, auth]);

  if (loading) return <div>Loading quiz details...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <!-- Left Column --> */}
          <div className="bg-primary rounded-lg p-6 text-white">
            <div className="flex flex-col items-center mb-6">
              <img
                src={Avatar}
                alt="Profile Pic"
                className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
              />

              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-xl">{`${userData.position} Position`}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm opacity-75">Mark</p>
                <p className="text-2xl font-bold">{userData.marks}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Correct</p>
                <p className="text-2xl font-bold">{userData.correct}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Wrong</p>
                <p className="text-2xl font-bold">{userData.wrong}</p>
              </div>
            </div>
          </div>

          {/* <!-- Right Column --> */}
          <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="mb-6">React Hooks Quiz</p>
            <ul className="space-y-4">
              {leaderboard.map((entry) => (
                <LeaderBoardItem key={entry.userId} entry={entry} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
