import { useState, useEffect } from "react";
import { Search } from "./components/Search";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos && storedTodos.length > 0) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text,
      category,
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  const removeTodo = id => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter(todo => (todo.id !== id ? todo : null));
    setTodos(filteredTodos);
  };

  const completeTodo = id => {
    const newTodos = [...todos];
    newTodos.map(todo => (todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo));
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search
        search={search}
        setSearch={setSearch}
      />
      <Filter
        filter={filter}
        setFilter={setFilter}
        setSort={setSort}
      />
      <div className="todo-list">
        {todos
          .filter(todo => (filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted))
          .filter(todo => todo.text.toLowerCase().includes(search.toLocaleLowerCase()))
          .sort((a, b) => (sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)))
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
