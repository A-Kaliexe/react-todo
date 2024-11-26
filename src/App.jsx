import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
  const[todoList, setTodoList] = useState([]);
  function addTodo(newTodo){
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }
  
   return (
  <>
    <div>
      <h1>Todo List</h1>
        <TodoList todoList={todoList}/>
        <AddTodoForm onAddTodo={addTodo}/>

    </div>
  </>
  );
}

export default App
