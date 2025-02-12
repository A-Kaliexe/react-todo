import style from "./TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoListItem;
