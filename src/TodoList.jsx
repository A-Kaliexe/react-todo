import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todoList}) {
    return (
    <>
      <ul>
      <ul>
        {/* render the list */}
        {todoList.map((todo) => 
        <TodoListItem key={todo.id} todo={todo} />
        )}
      </ul>
    </>
    );
}
 export default TodoList
