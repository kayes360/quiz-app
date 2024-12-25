import React, { useEffect, useReducer, useState } from "react";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { initialState, questionReducer } from "../../reducers/QuestionReducer";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

export default function CreateQuestionForm({
  quizsetId,
  onAddQuestion,
  editableQuestion,
  resetEditing,
  onUpdateQuestion,
}) {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const { api } = useAxios();
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editableQuestion) {
      reset({
        question: editableQuestion.question,
        optionText0: editableQuestion.options[0] || "",
        optionText1: editableQuestion.options[1] || "",
        optionText2: editableQuestion.options[2] || "",
        optionText3: editableQuestion.options[3] || "",
      });
      setCorrectAnswer(
        editableQuestion.options.findIndex(
          (opt) => opt === editableQuestion.correctAnswer
        )
      );
    }
  }, [editableQuestion, reset]);
  const onSubmit = async (formData) => {
    // Check if a correct answer is selected
    if (correctAnswer === null) {
      alert("Please select at least one correct answer");
      return;
    }
    const { question, optionText0, optionText1, optionText2, optionText3 } =
      formData;
    const formSubmissionData = {
      question,
      options: [optionText0, optionText1, optionText2, optionText3],
      correctAnswer: formData[`optionText${correctAnswer}`],
    };

    dispatch({ type: actions.question.QUESTION_LOADING });

    // Here you would typically send this to your backend

    if (editableQuestion) {
      console.log(formData);
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${
          editableQuestion.id
        }`,
        formSubmissionData
      );
      if (response.status === 200) {
        onUpdateQuestion(response.data);
        setCorrectAnswer(null);
        resetEditing();
      }
    } else {
      try {
        const response = await api.post(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/admin/quizzes/${quizsetId}/questions`,
          formSubmissionData
        );
        if (response.status === 201) {
          dispatch({
            type: actions.question.QUESTION_CREATED,
            payload: response.data,
          });
          onAddQuestion(formSubmissionData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        reset({
          question: "",
          optionText0: "",
          optionText1: "",
          optionText2: "",
          optionText3: "",
        });
        setCorrectAnswer(null);
      }
    }
  };

  const handleCheckboxChange = (index) => {
    setCorrectAnswer((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          htmlFor="question"
          label="Question Title"
          error={errors.question}
        >
          <input
            type="text"
            id="question"
            className="w-full mt-2 p-2 border border-input rounded-md"
            placeholder="Enter quiz question"
            {...register("question", { required: "Quiz question is required" })}
          />
        </InputField>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>
        <div id="optionsContainer" className="space-y-2 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
            >
              <input
                type="checkbox"
                id={`option${index}`}
                checked={correctAnswer === index}
                onChange={() => handleCheckboxChange(index)}
                className="text-primary focus:ring-0 w-4 h-4"
              />
              <label htmlFor={`option${index}`} className="sr-only">
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`optionText${index}`}
                {...register(`optionText${index}`, {
                  required: `Option ${index + 1} is required`,
                })}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors mb-4"
        >
          Save Quiz
        </button>
      </form>
    </div>
  );
}
