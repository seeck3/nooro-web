"use client"
import React, { useRef, useState } from "react";
import {ConfirmationModal, Toggle} from "@/app/components";
import { Task } from "@/app/types";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

type Props = {
  task: Task;
  handleToggle: (task: Task, completed: boolean) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
};

export const TaskList = ({ task, handleToggle, handleDeleteTask }: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTrucated, setIsTrucated] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    if (textRef.current) {
      setIsTrucated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  };

  return (
    <li
      key={task.id}
      className={`space-x-4 bg-[#262626] border border-y-[#333333] border-r-[#333333] rounded-lg shadow-md p-4 mb-4 flex justify-between items-center border-l-8 ${task.color}`}
    >
      <Toggle
        completed={task.completed}
        onChange={(completed) => {
          handleToggle(task, completed);
        }}
      />
      <Link
        href={`/tasks/${task.id}`}
        className="flex-grow flex text-[#F2F2F2] min-w-0" // ✅ min-w-0 is critical!
      >
        <div className="relative w-full overflow-hidden">
          <span
            ref={textRef}
            data-tooltip-id="task-tooltip"
            data-tooltip-content={task.title}
            data-tooltip-place="bottom"
            data-tooltip-hidden={!isTrucated}
            onMouseEnter={handleMouseEnter}
            className={`font-semibold text-ellipsis overflow-hidden whitespace-nowrap block w-full 
                ${task.completed ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </span>
        </div>
      </Link>

      <button
        onClick={() => setIsOpen(true)}
        className="text-white px-2 py-1 rounded shadow hover:bg-red-500 transition flex-shrink-0"
      >
        <img src="/delete.svg" className="h-5 w-5 object-contain" />
      </button>
      <Tooltip
        id="task-tooltip"
        className="bg-black text-white px-2 py-1 rounded-md shadow-md transition-opacity"
      />
      <ConfirmationModal message="Do you really want to delete?" isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={() => handleDeleteTask(task.id)} />
    </li>
  );
};
