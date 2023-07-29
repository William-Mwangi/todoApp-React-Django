import React, { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const TodoList = ({ todos, deleteTodoItem, update_todo, complete_todo }) => {
  let [toggle, setToggle] = useState(false);
  let [todoItem, setTodoItem] = useState("");
  let [todoId, setTodoId] = useState(0);
  const toggleModal = (item, id) => {
    setToggle(true);
    setTodoItem(item);
    setTodoId(id);
  };
  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-list-item" key={todo.id}>
            <div className="task">
              <input
                type="checkbox"
                id="t_task"
                onChange={(e) => complete_todo(todo.id, e)}
              ></input>
              <p className={todo.status == "Completed" ? "strike" : ""}>
                {" "}
                {todo.id + 1}, {todo.task}{" "}
              </p>
            </div>

            <div className="btn-container">
              <div className="edit">
                <RiEdit2Line
                  size={30}
                  onClick={() => toggleModal(todo.task, todo.id)}
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
              onSubmit={() => {
                update_todo(todoId, todoItem);
                setToggle(false);
              }}
            >
              <input
                type="text"
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
