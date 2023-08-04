import React, { useRef, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const TodoList = ({ todos, deleteTodoItem, update_todo, complete_todo }) => {
  let taskRef = useRef(null); // this line references the update input field
  let [toggle, setToggle] = useState(false);
  let [todoItem, setTodoItem] = useState("");
  let [todoId, setTodoId] = useState(0);
  let [todo, setTodo] = useState({});
  let [task, setTask] = useState("");

  // this function helps to pass the current todo to the update form
  const toggleModal = (item, id, todo) => {
    setToggle(true);
    setTodoItem(item);
    setTodoId(id);
    setTodo(todo);

    console.log(toggle);
  };
  return (
    <>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-list-item" key={index}>
            <div className="task">
              <input
                type="checkbox"
                onChange={(e) => complete_todo(todo.id, e, todo)}
              ></input>
              <p
                id="t_task"
                className={todo.completed == true ? "strike" : ""}
                //className="strike"
              >
                {todo.task}{" "}
              </p>
            </div>

            <div className="btn-container">
              <div className="edit">
                <RiEdit2Line
                  size={30}
                  onClick={() => toggleModal(todo.task, todo.id, todo)}
                />
              </div>
              <div className="del">
                <TiDelete size={30} onClick={() => deleteTodoItem(todo.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*modal container */}

      {toggle && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update Form</h1>

            <form
              action=""
              onSubmit={(e) => {
                update_todo(e, todoId, todoItem);
                setToggle(false);
              }}
            >
              <input
                type="text"
                ref={taskRef}
                value={todoItem}
                placeholder="Update todo item"
                onChange={(e) => setTodoItem(e.target.value)}
                required
              ></input>
              <button id="add"> Add</button>
            </form>

            <div className="btn-container">
              <button
                className="cancel mod-btn"
                onClick={() => setToggle(false)}
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
