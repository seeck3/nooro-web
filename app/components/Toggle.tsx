import React from "react";

type Props = {
  completed: boolean;
  onChange: (completed: boolean) => void;
  displayLabel?: boolean;
}

export const Toggle = ({ completed, onChange, displayLabel = false }: Props) => {
  return (
    <label 
    className="relative inline-flex items-center cursor-pointer" 
    // onClick={(e) => e.stopPropagation()} 
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => {
            onChange(e.target.checked)
        }}
        className="sr-only peer"
      />
      <div
      className="w-10 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all relative">
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            completed ? "translate-x-3" : "translate-x-0"
          }`}
        />
      </div>
      {displayLabel ? (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {completed ? "Completed" : "Not Completed"}
        </span>
      ) : null}
    </label>
  );
};