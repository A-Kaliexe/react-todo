import React, { useState } from 'react';


function AddTodoForm({onAddTodo}) { 
  const[todoTitle, setTodoTitle] = useState("")

function handleTitleChange(e) {
  const newTodotitle = e.target.value
  setTodoTitle(newTodotitle);
}

function handleAddTodo(e) {
    e.preventDefault();
    const newTodo = { title: todoTitle, id: Date.now()}
    onAddTodo(newTodo);
    setTodoTitle("");
}
return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange}/>
      <button type="submit">Add</button>
    </form>
  );
}


export default AddTodoForm;
