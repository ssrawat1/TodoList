import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{ id: Date.now(), ...todo }, ...prevTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) =>
      prevTodo.filter((initialTodo) => initialTodo.id !== id)
    );
  };

  const updateTodo = (id, todo) => {
    setTodos((prevTodo) =>
      prevTodo.map((initialTodo) =>
        initialTodo.id === id ? todo : initialTodo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((initialTodo) =>
        initialTodo.id === id
          ? { ...initialTodo, completed: !initialTodo.completed }
          : initialTodo
      )
    );
  };

  useEffect(() => {
    const getTodos = JSON.parse(localStorage.getItem("todos"));
    if (getTodos && getTodos.length > 0) {
      setTodos(getTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="bg-primary min-h-screen py-8">
        <div className="container">
          <h1 className="title">Manage Your Todos</h1>
          <div className="todo-list">
            <TodoForm />
          </div>
          <div className="todoItemsContainer">
            {todos.map((todo) => (
              <div className="todoItem" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
