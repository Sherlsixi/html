import React from "react";

function Todo({ todo, toggleTodo }) {
  const handleToggle = (e) => {
    toggleTodo(todo.id);
  };
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          onChange={handleToggle}
        />
      </label>
      {todo.name}
    </div>
  );
}

export default Todo;
