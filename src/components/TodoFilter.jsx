import React from "react";

const TodoFilter = ({ filter_todo }) => {
  return (
    <form action="">
      <select name="" id="" onChange={(e) => filter_todo(e.target.value)}>
        <option value=""></option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </form>
  );
};

export default TodoFilter;
