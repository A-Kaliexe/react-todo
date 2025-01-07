import { useState } from 'react';
import InputWithLabel from './InputWithLabel';


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
     <InputWithLabel 
     label="TodoTitle" 
     value={todoTitle}
     onChange={handleTitleChange}
     id="todoTitle"/>
      <button type="submit">Add</button>
    </form>
  );
}


export default AddTodoForm;
