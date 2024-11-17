import React from 'react';


function AddTodoForm(props) { 
function handleAddTodo(e) {e.preventDefault();
     const todoTitle = e.target.title.value;
    console.log(todoTitle);
    e.target.reset();
    props.onAddTodo(todoTitle);
}
return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
