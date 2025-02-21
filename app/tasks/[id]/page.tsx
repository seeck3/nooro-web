"use client";
import { useEffect, useState } from "react";
import { ErrorComponent, LoadingSpinner, TaskForm } from "@/app/components";
import { useRouter, useParams } from "next/navigation";
import { fetchTask } from "@/lib/api";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getTask = async (id: string) => {
      try {
        const data = await fetchTask(id);
        setTask(data);
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        }
      }
    };
    if (typeof id === "string") {
      getTask(id);
    }
  }, [id]);

  if (error)
    return (
      <ErrorComponent message={error} onFailure={() => router.push("/")} />
    );

  if (!task) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <TaskForm task={task} onSuccess={() => router.push("/")} />
    </div>
  );
}
