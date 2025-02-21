"use client"
import { useRouter } from "next/navigation";
import {TaskForm} from "@/app/components";

export default function NewTaskPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <TaskForm onSuccess={() => router.push("/")} />
    </div>
  );
}
