function TodoListItem({todo, removeTodo}){
    return(
        <li>{todo.title}
        <button type="button" onClick={() => removeTodo(todo.id)}>Remove</button>
        </li>
    )
}
export default TodoListItem