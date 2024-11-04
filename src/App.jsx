import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [
  { 
    id: 1, 
    title: 'Install Vite React'
  },
  { 
    id: 2, 
    title: 'Do Project Setup' 
  },
  { 
    id: 3, 
    title: 'Complete Assignment' 
  },
]

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {/* render the list */}
        {todoList.map((todo) => 
        <li key={todo.id}>{todo.title}</li>
      )}
      </ul>
    </div>
  );
}

export default App
