import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import CreateQuestionForm from "./CreateQuestionForm";
import QuestionWithAnswer from "./QuestionWithAnswer";
import {
  initialState as quizSetInitialState,
  quizSetReducer,
} from "../../reducers/QuizSetReducer";
import {
  initialState as questionInitialState,
  questionReducer,
} from "../../reducers/QuestionReducer";

import { actions } from "../../actions";

export default function QuizSetEntry() {
  const { quizsetId } = useParams();

  const [quizSetState, quizSetDispatch] = useReducer(
    quizSetReducer,
    quizSetInitialState
  );
  const [questionState, questionDispatch] = useReducer(
    questionReducer,
    questionInitialState
  ); 
const [editableQuestion, setEditableQuestion] = useState(null)
  const { api } = useAxios();

  useEffect(() => {
    quizSetDispatch({ type: actions.quiz_set.QUIZ_SET_LOADING });
    questionDispatch({ type: actions.question.QUESTION_LOADING });
    
    const fetchQuizSets = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        );
        if (response.status === 200) {
          const singleQuizSetData = response?.data.find(
            (set) => set.id === quizsetId
          ); 
          console.log('singleQuizSetData',singleQuizSetData)
          quizSetDispatch({
            type: actions.quiz_set.QUIZ_SET_FETCHED,
            data: singleQuizSetData,
          });
          questionDispatch({
            type: actions.question.QUESTION_FETCHED,
            data: singleQuizSetData.Questions,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizSets(); 
  }, []);
  useEffect(() => {
    console.log("Updated questionState:", questionState);
}, [questionState]);


  const handleAddQuestion = (newQuestion) => {
    questionDispatch({
      type: actions.question.QUESTION_CREATED,
      payload: newQuestion,
    });
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`
      );
      if (response.status === 200) {
        questionDispatch({
          type: actions.question.QUESTION_DELETED,
          id: questionId,
        });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };


  const handleEditClick  = (question) => { 
    setEditableQuestion(question); 
   }

   const handleUpdateQuestion = (updatedQuestion) => {
    questionDispatch({
      type: actions.question.QUESTION_UPDATED,
      payload: updatedQuestion,
    });
    setEditableQuestion(null); // Exit editing mode
  };
   const resetEditing = () => setEditableQuestion(null);

  if (quizSetState?.loading) {
    return <p>quizSetState Loading...</p>;
  }

  if (!quizSetState?.quizSet) {
    return <p>Error fetching quiz set data or quiz set not found.</p>;
  }
  if (questionState?.loading) {
    return <p>questionState Loading...</p>;
  }

  if (!quizSetState?.quizSet) {
    return <p>Error fetching quiz set data or quiz set not found.</p>;
  }

  const handlePublishToggle = async (quizsetId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"; // Toggle status
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizsetId}`,
        { status: newStatus }  
      );
  
      if (response.status === 200) {
        quizSetDispatch({
          type: actions.quiz_set.QUIZ_SET_UPDATED,
          payload: { status: newStatus }, // Update the status field in state
        });
        console.log(`Quiz set status changed to: ${newStatus}`);
      }
    } catch (error) {
      console.error("Error toggling quiz set status:", error);
    }
  };
  return (
    <>
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-buzzr-purple"
            >
              Home
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-buzzr-purple"
              aria-current="page"
            >
              Quizzes
            </a>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
        <div className="">
          <h2 className="text-3xl font-bold mb-4">
            {quizSetState?.quizSet?.title}
          </h2>
          <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
            Total number of questions :{" "}
            {questionState.questions.length}
          </div>
          <p className="text-gray-600 mb-4">
            {quizSetState?.quizSet?.description}
          </p>
          <CreateQuestionForm
            quizsetId={quizsetId}
            onAddQuestion={handleAddQuestion}
            editableQuestion={editableQuestion}
            resetEditing={resetEditing}
            onUpdateQuestion={handleUpdateQuestion}
          />
          <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors" onClick={() =>  handlePublishToggle(quizsetId, quizSetState?.quizSet?.status) }>
          
            {quizSetState?.quizSet?.status === "published" ? "Draft " : "Publish "}
            This Quiz Set
          </button>
        </div>

        <div className="px-4">
          { 
          questionState.questions && questionState.questions.length > 0 ? (
            questionState.questions.map((question) => (
              <QuestionWithAnswer
                key={question.id}
                question={question}
                onDelete={handleDeleteQuestion}
                onEdit={handleEditClick}
              />
            ))
          ) : (
            <p className="text-gray-600">
              No questions available for this quiz set.
            </p>
          )
          
          }
        </div>
      </div>
    </>
  );
}

 