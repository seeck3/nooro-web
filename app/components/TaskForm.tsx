"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTask } from "@/lib/api";
import { Task } from "@/app/types";

type Props = {
  task?: Task;
  onSuccess: () => void;
};

const colors = [
  { name: "Light Blue", bg: "bg-blue-400", border: "border-blue-400" },
  { name: "Dark Blue", bg: "bg-blue-600", border: "border-blue-600" },
  { name: "Light Red", bg: "bg-red-400", border: "border-red-400" },
  { name: "Dark Red", bg: "bg-red-600", border: "border-red-600" },
  { name: "Light Green", bg: "bg-green-400", border: "border-green-400" },
  { name: "Dark Green", bg: "bg-green-600", border: "border-green-600" },
  { name: "Light Gray", bg: "bg-gray-400", border: "border-gray-400" },
  { name: "Dark Gray", bg: "bg-gray-700", border: "border-gray-700" },
  { name: "Light Yellow", bg: "bg-yellow-400", border: "border-yellow-400" },
  { name: "Dark Yellow", bg: "bg-yellow-600", border: "border-yellow-600" },
  { name: "Light Purple", bg: "bg-purple-400", border: "border-purple-400" },
  { name: "Dark Purple", bg: "bg-purple-600", border: "border-purple-600" },
  { name: "Light Pink", bg: "bg-pink-400", border: "border-pink-400" },
  { name: "Dark Pink", bg: "bg-pink-600", border: "border-pink-600" },
  { name: "Light Orange", bg: "bg-orange-400", border: "border-orange-400" },
  { name: "Dark Orange", bg: "bg-orange-600", border: "border-orange-600" },
  { name: "Light Teal", bg: "bg-teal-400", border: "border-teal-400" },
  { name: "Dark Teal", bg: "bg-teal-600", border: "border-teal-600" },
  { name: "Light Indigo", bg: "bg-indigo-400", border: "border-indigo-400" },
  { name: "Dark Indigo", bg: "bg-indigo-600", border: "border-indigo-600" },
  { name: "Light Lime", bg: "bg-lime-400", border: "border-lime-400" },
  { name: "Dark Lime", bg: "bg-lime-600", border: "border-lime-600" },
  { name: "Light Cyan", bg: "bg-cyan-400", border: "border-cyan-400" },
  { name: "Dark Cyan", bg: "bg-cyan-600", border: "border-cyan-600" },
];

export const TaskForm = ({ task, onSuccess }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState(task?.title || "");
  const [color, setColor] = useState(task?.color || "border-blue-400");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (task) {
        await saveTask({ ...task, title, color });
      } else {
        await saveTask({ id: "", title, color, completed: false });
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded w-full max-w-3xl "
      >
        <button
          type="button"
          className="text-white rounded mb-10"
          disabled={loading}
          onClick={handleCancel}
        >
          <img src="/backArrow.svg" alt="backArrow_icon" />
        </button>

        <div className="mb-4">
          <label className="block text-[#4EA8DE] mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-[#262626] border-[#333333] focus:outline-none focus:border-[#333333] text-[#F2F2F2] focus:text-[#F2F2F2]"
            placeholder="Ex. Brush you teeth"
            required
          />
        </div>

        <label className="block text-[#4EA8DE] mb-2">Color</label>
        <div className="flex flex-wrap gap-4 p-2 mb-10">
          {colors.map((c) => (
            <div
              key={c.bg}
              className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                c.bg
              } ${
                color === c.border
                  ? "border-white scale-110"
                  : "border-transparent"
              } ${c.bg} transition-transform duration-200`}
              onClick={() => setColor(c.border)}
            ></div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : task ? "Save" : "Add Task"}
        </button>
      </form>
    </div>
  );
};
