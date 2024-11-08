import React from 'react';

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
    }
  ]

function TodoList() {
    return (
    <>
        <ul>
        {/* render the list */}
        {todoList.map((todo) => 
        <li key={todo.id}>{todo.title}</li>
      )}
      </ul>
    </>
    );
}
 export default TodoList