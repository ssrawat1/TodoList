import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import "../App.css"

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { toggleComplete, updateTodo, deleteTodo } = useTodo();
  
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
        <input
            type="checkbox"
            className="checkbox"
            checked={todo.completed}
            onChange={toggleCompleted}
        />
        <input
            type="text"
            className={`todo-input ${isTodoEditable ? "editable" : ""} ${todo.completed ? "completed" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
        />
        <button
            className="edit-button"
            onClick={() => {
                if (todo.completed) return;

                if (isTodoEditable) {
                    editTodo();
                } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
        >
            {isTodoEditable ? <i className="fa-solid fa-floppy-disk"></i> :<i className="fa-solid fa-pen-to-square"></i> }
        </button>
        <button
            className="delete-button"
            onClick={() => deleteTodo(todo.id)}
        >
        <i className="fa-solid fa-trash"></i>
        </button>
    </div>
);
};

export default TodoItem;
