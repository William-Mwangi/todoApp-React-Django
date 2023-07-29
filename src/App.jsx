import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoSearch from "./components/TodoSearch";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    { id: 0, task: "Learn JavaScript", status: "Active" },
    { id: 1, task: "Play PS5", status: "Active" },
    { id: 2, task: "read motivational videos", status: "Active" },
    { id: 3, task: "Watch youtube videos", status: "Active" },
  ]);

  let updateTodo = (id, new_task) => {
    let todo = todos[id];
    let updatedTodo = { ...todo, task: new_task, status: "Active" };
    setTodos(todos.map((t) => (t.id == id ? updatedTodo : t)));
  };

  const addToDo = (data) => {
    setTodos([
      ...todos,
      (data = {
        ...data,
        id: parseInt(todos[todos.length - 1].id) + 1,
        status: "Active",
      }),
    ]);
    console.log(data);
  };

  const deleteTodoItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id, e) => {
    if (e.target.checked) {
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, status: "Completed" } : todo
        )
      );
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, status: "Active" } : todo
        )
      );
    }
  };

  let filterTodo = (text) => {
    setTodos(todos.filter((todo) => todo.status === text));
  };
  return (
    <div className="Todo-container">
      <TodoSearch add_todo={addToDo}></TodoSearch>
      <TodoFilter filter_todo={filterTodo}></TodoFilter>
      <TodoList
        todos={todos}
        deleteTodoItem={deleteTodoItem}
        update_todo={updateTodo}
        complete_todo={completeTodo}
      />
    </div>
  );

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App;
