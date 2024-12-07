/* eslint-disable no-console */
import { Todo } from "@app/types/todo";
import SQLite from "react-native-sqlite-storage";

// Enable debug mode (optional, useful for development)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Open database connection
const db = SQLite.openDatabase(
  {
    name: "todoApp.db",
    location: "default",
  },
  () => console.log("Database opened successfully"),
  (error) => console.error("Error opening database:", error),
);

export default class SQLiteUtils {
  static async initializeDatabase(): Promise<void> {
    try {
      const connection = await db;
      await connection.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT CHECK(priority IN ('high', 'medium', 'low')) NOT NULL,
            dueDate TEXT NOT NULL,
            isCompleted INTEGER DEFAULT 0
          );`,
        );
      });
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  static async addTodo(todo: Omit<Todo, "id">): Promise<void> {
    const { title, description, priority, dueDate, isCompleted } = todo;
    try {
      const connection = await db;
      await connection.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO todos (title, description, priority, dueDate, isCompleted) VALUES (?, ?, ?, ?, ?);`,
          [title, description || "", priority, dueDate, isCompleted ? 1 : 0],
        );
      });
      console.log("Todo added successfully");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  static async getTodos(): Promise<Todo[]> {
    try {
      const connection = await db;
      const todos: Todo[] = [];
      await connection.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM todos ORDER BY 
            CASE priority
              WHEN 'high' THEN 1
              WHEN 'medium' THEN 2
              WHEN 'low' THEN 3
            END, dueDate ASC;`,
          [],
          (_, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              todos.push(result.rows.item(i));
            }
          },
        );
      });
      console.log("Todos fetched successfully:", todos);
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  }

  static async updateTodo(todo: Todo): Promise<void> {
    const { id, title, description, priority, dueDate, isCompleted } = todo;
    try {
      const connection = await db;
      await connection.transaction((tx) => {
        tx.executeSql(
          `UPDATE todos SET title = ?, description = ?, priority = ?, dueDate = ?, isCompleted = ? WHERE id = ?;`,
          [
            title,
            description || "",
            priority,
            dueDate,
            isCompleted ? 1 : 0,
            id,
          ],
        );
      });
      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  static async deleteTodo(id: number): Promise<void> {
    try {
      const connection = await db;
      await connection.transaction((tx) => {
        tx.executeSql(`DELETE FROM todos WHERE id = ?;`, [id]);
      });
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
}
