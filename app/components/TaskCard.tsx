import React from "react";
import Link from "next/link";

type Props = {
  task: { id: string; title: string; completed: boolean; color?: string };
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskCard = ({ task, toggleComplete, deleteTask }: Props) => {
  return (
    <div
      className="relative p-5 rounded-lg shadow-lg flex justify-between items-center border-l-8 transition hover:scale-105"
      style={{ borderColor: task.color || "#4A90E2", background: "#fff" }}
    >
      {/* Task Details */}
      <div>
        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.title}
        </h3>
      </div>

      {/* Toggle & Action Buttons */}
      <div className="flex gap-3 items-center">
        {/* Toggle Completion */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
        />

        {/* Edit Button */}
        <Link href={`/tasks/edit/${task.id}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition">
            Edit
          </button>
        </Link>

        {/* Delete Button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

