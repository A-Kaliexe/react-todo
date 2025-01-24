import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
    }
  }

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`


  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const message = `Error has ocurred:
                             ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);
    
    const todos = data.records.map((todo) => {
      const newTodo =  {
          id: todo.id,
          title: todo.fields.title
        }

        return newTodo

    });

    setTodoList(todos);
    setIsLoading(false);
  } catch (error) {
    console.error(error.message);
    setIsLoading(false);
  }
};

//handles Airtable
useEffect(() => {
fetchData()
}, []);

  useEffect(() => {
    if (!isLoading) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
      }
    }, [isLoading, todoList]);
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

