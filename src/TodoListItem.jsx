import style from "./TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function TodoListItem({ todo, removeTodo }) {
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button
        type="button"
        onClick={() => removeTodo(todo.id)}
        className={style.RemoveBtnIcon}
      >
        {" "}
        Remove
        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#fafafa" }} />
      </button>
    </li>
  );
}
export default TodoListItem;
