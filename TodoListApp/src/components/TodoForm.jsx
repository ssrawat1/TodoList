import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import "../App.css";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const addTodos = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo: todo, completed: false });
    setTodo("");
  };

  return (
    <div>
      <form className="todo-form" onSubmit={addTodos}>
        <input
          className="todo-input"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}  
        />
        <button className="submit-button" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
