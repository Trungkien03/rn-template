// src/types/todo.ts
export type Priority = "high" | "medium" | "low";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string; // Use ISO 8601 date format
  isCompleted: boolean;
}
