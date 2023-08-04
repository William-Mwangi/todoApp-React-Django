import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoSearch from "./components/TodoSearch";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/todos")
      .then((res) => {
        //console.log(res.data);
        setTodos(res.data);
      })
      .catch((errors) => setErrors(errors.message));
  }, []);

  let updateTodo = (e, id, new_task, todo) => {
    e.preventDefault();
    // let todo = todos[id];
    let updatedTodo = { ...todo, task: new_task, status: "Active" };
    setTodos(todos.map((t) => (t.id == id ? updatedTodo : t)));

    let updatedUser = { ...todo, task: new_task };
    axios.patch("http://127.0.0.1:8000/todos/" + id, updatedUser);
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

    const originalTodos = [...todos];

    axios
      .post("http://127.0.0.1:8000/todos", data)
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => {
        setErrors(err.message);
        setTodos(originalTodos);
      });
  };

  const deleteTodoItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    const originalTodos = [...todos];
    axios.delete("http://127.0.0.1:8000/todos/" + id).catch((err) => {
      setTodos(originalTodos);
      setErrors(err.message);
    });
  };

  const completeTodo = (id, e, todo) => {
    if (e.target.checked) {
      console.log("okay");
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, completed: true } : todo
        )
      );
      let updatedTodo = { ...todo, completed: true };
      axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo);
    } else {
      console.log("uncheck");
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, completed: false } : todo
        )
      );

      let updatedTodo = { ...todo, completed: false };
      axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo);
    }
  };

  let filterTodo = (text) => {
    setTodos(todos.filter((todo) => todo.status === text));
  };
  return (
    <div className="Todo-container">
      {errors && <p>{errors}</p>}
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
