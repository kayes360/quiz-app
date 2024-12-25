import React, { useState, useEffect } from "react";

export default function QuizQuestions({ question, onNext, isLast, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Randomize options on component mount
  const [shuffledOptions, setShuffledOptions] = useState([]);
  useEffect(() => {
    setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
  }, [question]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAnswer(question.id, option); // Notify parent of the selected answer
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{question.question}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shuffledOptions.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg ${
              selectedOption === option ? "bg-primary " : ""
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              className="form-radio text-buzzr-purple"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {!isLast && (
        <button
          onClick={onNext}
          disabled={!selectedOption} // Disable Next until an answer is selected
          className="w-full text-center block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
        >
          Next
        </button>
      )}
      {isLast && (
        <button
          disabled={!selectedOption} // Disable Submit until an answer is selected
          onClick={onNext}
          className="w-full text-center block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 mb-6 font-semibold my-8"
        >
          Submit
        </button>
      )}
    </div>
  );
}



// [
//     {
//         "question_id": "ffe8e8fc-1381-463d-be00-af6c3649a805",
//         "answer": "useAuth",
//         "marks": 5
//     },
//     {
//         "question_id": "1e3d3258-9235-49c9-8fb1-d0fb8b67f506",
//         "answer": "18",
//         "marks": 5
//     }
// ]