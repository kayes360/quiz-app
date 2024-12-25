import React from "react";
import Avatar from "../assets/avater.webp";

export default function LeaderBoardItem({entry}) {
    console.log('entry',entry)
    const {name, rank, marks} = entry
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={Avatar}
          alt="SPD Smith"
          className="object-cover w-10 h-10 rounded-full mr-4"
        />
        <div>
        <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{`${rank}${
            rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th"
          }`}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{marks}</span>
      </div>
    </li>
  );
}
