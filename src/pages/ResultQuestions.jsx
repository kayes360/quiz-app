import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import { useParams } from 'react-router-dom';

export default function ResultQuestions({submitted_answers}) {
 

    const {quizId} = useParams()
const {api} = useAxios()
const [quiz, setQuiz] = useState(null); 
const [loading, setLoading] = useState(true);  
const [error, setError] = useState(null);  
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


 
 
  return ( 
   <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
   <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
     <div className="px-4">
       {/* <!-- Question One --> */}

       {
        quiz?.questions.map((question)=>(
          
       <div key={question?.id} className="rounded-lg overflow-hidden shadow-sm mb-4">
         <div className="bg-white p-6 !pb-2">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">
                
              {question?.question}
             </h3>
           </div>
           <div className="space-y-2">
          
               
            

               {question?.options.map((option, i) => {
                    const isChecked = submitted_answers.some(
                      (answer) =>
                        answer.question_id === question.id &&
                        answer.answer === option
                    );
                    let bgClass = ""; // Default class
                        if (isChecked) {
                        if (isChecked && question?.correctAnswer === option) {
                            bgClass = "bg-green-200"; // Correct answer selected
                        } else {
                            bgClass = "bg-red-200"; // Incorrect answer selected
                        }
                        }

                    return (
                      <label
                        key={i}
                        className={`flex items-center space-x-3 border p-2 rounded  ${bgClass}`}
                      >
                        <input
                          type="radio"
                          name={`answer-${question.id}`}
                          className="form-radio text-buzzr-purple"
                          checked={isChecked}
                          readOnly
                        />
                        <span>{option}</span>
                        <span>{question?.correctAnswer === option ?"✔️" : ""}</span>
                      </label>
                    );
                  })}
        
           </div>
         </div>
         
       </div> 
         
        ))
    }
     </div>
   </div>
 </div>
  )
}
