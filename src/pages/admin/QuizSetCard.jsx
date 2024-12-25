import React from "react";
import { Link } from "react-router-dom";

export default function QuizSetCard({ set, onDelete }) {
  
  return (
    <Link  to={`/admin/quizsetentry/${set.id}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
     

      <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
          <path d="M12 12l4 -2.25l4 -2.25" />
          <path d="M12 12l0 9" />
          <path d="M12 12l-4 -2.25l-4 -2.25" />
          <path d="M20 12l-4 2v4.75" />
          <path d="M4 12l4 2l0 4.75" />
          <path d="M8 5.25l4 2.25l4 -2.25" />
        </svg>

        <div className="flex items-center">
          <div
            className={`border px-2 py-1 rounded-lg text-xs ${
              set?.status === "draft"
                ? "text-orange-400 border-orange-400"
                : set?.status === "published"
                ? "text-blue-400 border-blue-400"
                : "text-gray-400 border-gray-400"
            }`}
          >
            {set?.status === "draft"
              ? "Draft"
              : set?.status === "published"
              ? "Published"
              : "Unknown"}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
        {set?.title}
      </h3>
      <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
        {set?.description}
      </p>
      <button
        className="border border-red-600 rounded-lg px-2 py-1 text-xs hover:bg-red-600 hover:text-white cursor-pointer float-right"
        onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation to the Link
            e.preventDefault(); // Prevent the default Link behavior
            onDelete(set?.id);
          }}
      >
        Delete
      </button>
    </Link>
  );
}
