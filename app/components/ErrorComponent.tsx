import React from "react";

type Props = {
  message?: string;
  onFailure?: () => void;
}

export const ErrorComponent = ({
  message = "Something went wrong.",
  onFailure,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-100 text-red-800 p-4 rounded-md shadow-md w-full max-w-md mx-auto mt-6">
      <svg
        className="w-10 h-10 text-red-500 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold">{message}</p>
      {onFailure && (
        <button
          onClick={onFailure}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
        >
          Go Home
        </button>
      )}
    </div>
  );
};

