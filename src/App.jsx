import { useState } from 'react'
import {useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  )

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }, [todoList]);

    return (
      [todoList, setTodoList]
    )
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
  
  function addTodo(newTodo){
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }
  
   return (
  <>
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
        <TodoList todoList={todoList}/>
    </div>
  </>
  );
}

export default App