import React from "react";

export default function QuestionWithAnswer({ question, onDelete,onEdit }) {
 
  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {/* quiz question */}
            {question?.question}
          </h3>
        </div>
        <div className="space-y-2">
          {question.options.map((option, i) => (
            <label key={i} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`answer-${question.id}-${i}`}
                className="form-radio text-buzzr-purple"
                defaultChecked={option === question.correctAnswer}
                readOnly
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button
          className="text-red-600 hover:text-red-800 font-medium"
          onClick={() => {
            onDelete(question.id);
          }}
        >
          Delete
        </button>
        <button className="text-primary hover:text-primary/80 font-medium" onClick={() => {
            onEdit(question);
          }}>
          Edit Question
        </button>
      </div>
    </div>
  );
}
