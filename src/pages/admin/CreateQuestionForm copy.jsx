import React, { useReducer } from 'react'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form';
import { initialState, quizSetReducer } from '../../reducers/QuizSetReducer';
import useAxios from '../../hooks/useAxios';

export default function CreateQuestionForm({quizsetId}) {

  const [state, dispatch] = useReducer(quizSetReducer, initialState);
  const {api} = useAxios()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm();
     
        // post api path is 
        // `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}/questions`

  return (
    <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
              <InputField htmlFor="question" label="Question Title" error={errors.question}>
             
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
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option0"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option0" className="sr-only">
                    Option 1
                  </label>
                  <input
                    type="text"
                    id="optionText0"
                    name="optionText0"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 1"
                  />
                </div>
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option2"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option0" className="sr-only">
                    Option 2
                  </label>
                  <input
                    type="text"
                    id="optionText2"
                    name="optionText2"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 2"
                  />
                </div>
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option3"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option3" className="sr-only">
                    Option 3
                  </label>
                  <input
                    type="text"
                    id="optionText3"
                    name="optionText3"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 3"
                  />
                </div>
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option4"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option4" className="sr-only">
                    Option 4
                  </label>
                  <input
                    type="text"
                    id="optionText4"
                    name="optionText4"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 4"
                  />
                </div>
              </div>
              <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
                Save Quiz
              </button>

             
            </div>
  )
}
