import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import LeaderBoard from "./pages/LeaderBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard.jsx";
import QuizSetEntry from "./pages/admin/QuizSetEntry.jsx";
import QuizSetPage from "./pages/admin/QuizSetPage.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "quiz/:quizId",
        element: <ProtectedRoute element={<Quiz />} />,
      },

      {
        path: "leaderboard/:quizId",
        element: <ProtectedRoute element={<LeaderBoard />} />,
      },
    ],
  },
  {
    path: "/result/:quizId",
    element: <ProtectedRoute element={<Result />} />,
  },

  //for admin
  {
    path: "/admin",
    element: <ProtectedRoute element={<AdminLayout />} />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "quizsetpage",
        element: <QuizSetPage />,
      },
      {
        path: "quizsetentry/:quizsetId",
        element: <QuizSetEntry />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
