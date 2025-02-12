import { useState, useEffect } from "react";
import { orderBy } from "lodash";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReverse, setIsReverse] = useState(false);

  const toggleSortOrder = () => {
    setIsReverse(!isReverse);
  };

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      let todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      todos = orderBy(
        todos,
        [(todo) => todo.title.toLowerCase()],
        [isReverse ? "desc" : "asc"]
      );

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isReverse]);

  function addTodo(newTodo) {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }

  function removeTodo(id) {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
    localStorage.setItem("savedTodoList", JSON.stringify(updatedList));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <button onClick={toggleSortOrder}>
                  Toggle Button ({isReverse ? "Descending" : "Ascending"})
                </button>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </div>
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
