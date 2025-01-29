import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(e) {
    const newTodotitle = e.target.value;
    setTodoTitle(newTodotitle);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    const newTodo = { title: todoTitle, id: Date.now() };
    onAddTodo(newTodo);
    setTodoTitle("");
  }
  return (
    <form onSubmit={handleAddTodo} className={style.addtodoform}>
      <InputWithLabel
        label="TodoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        id="todoTitle"
      />
      <button type="submit" className={style.AddBtnIcon}>
        Add
        <FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "#fafafa" }} />
      </button>
    </form>
  );
}

export default AddTodoForm;
