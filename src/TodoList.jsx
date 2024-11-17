import React from 'react';
import TodoListItem from './TodoListItem';

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
        < TodoListItem key={todo.id} todo={todo} />
      )}
      </ul>
    </>
    );
}
 export default TodoList