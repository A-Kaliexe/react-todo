import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAsyncTodoList = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] 
          }
        });
      }, 2000); 
    });

    getAsyncTodoList
    .then(result=>{
      setTodoList(result.data.todoList)
      setIsLoading(false)
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
   }, [isLoading, todoList]);

  function addTodo(newTodo) {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }

  function removeTodo(id) {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  }

  return (
  <>
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
        {isLoading ? <p>Loading...</p> :<TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
    </div>
  </>
  );
}

export default App