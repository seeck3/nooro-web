"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "@/app/types";
import { deleteTask, fetchTasks, saveTask } from "@/lib/api";
import { TaskList } from "@/app/components";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleToggle = async (task: Task, completed: boolean) => {
    const { id } = task;
    try {
      await saveTask({ ...task, completed });
      setTasks((prev) =>
        prev.map((p) => (p.id === id ? { ...p, completed } : p))
      );
      getTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completedTasksText = !totalTasks
    ? totalTasks
    : `${completedTasks} of ${totalTasks}`;

  return (
    <div className="relative flex flex-col items-center p-6">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <Link
          href="/tasks"
          className="w-full mt-[-50px] bg-[#1E6F9F] text-white font-bold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition"
        >
          <div className="flex justify-center items-center space-x-2">
            <span>Create Task</span>
            <img src="/plus.svg" alt="plus_icon" className="w-4 h-4" />
          </div>
        </Link>

        <div className="mt-8 w-full">
          <div className="flex w-full justify-between">
            <div className="text-[#4EA8DE]">
              Tasks{" "}
              <span className="rounded-xl bg-[#333333] px-3 py-1 text-xs text-[#D9D9D9]">
                {totalTasks}
              </span>
            </div>
            <div className="text-[#8284FA]">
              Completed{" "}
              <span className="rounded-xl bg-[#333333] px-3 py-1 text-xs text-[#D9D9D9]">
                {completedTasksText}
              </span>
            </div>
          </div>
          {!!tasks.length ? (
            <ul className="mt-4 w-full">
              {tasks.map((task) => (
                <TaskList
                  key={task.id}
                  task={task}
                  handleToggle={handleToggle}
                  handleDeleteTask={handleDeleteTask}
                />
              ))}
            </ul>
          ) : (
            <div className="w-full flex flex-col justify-center items-center mt-4 border-t-[1px] border-[#333333] py-12 px-5 space-y-6">
              <img
                src="/clipboard.svg"
                alt="clipboard_icon"
                className="w-[56px]"
              />
              <span className="text-[#808080] font-extrabold">
                You don't have any tasks registered yet.
              </span>
              <span className="text-[#808080]">
                Create tasks and organize your to-do items
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
