import { Todo } from "@/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}
export default function TodoList({
  todos,
  deleteTodo,
  toggleTodo,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
