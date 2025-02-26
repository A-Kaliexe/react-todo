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

  const addTodo = async (newTodo) => {
   
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title, 
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === newTodo.id ? { ...todo, id: data.id } : todo
        )
      );
    } catch (error) {
      console.error("Error:", error.message);

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== newTodo.id)
      );
    }
  };

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const updatedList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedList);
    } catch (error) {
      console.error("Failed to delete todo:", error.message);
    }
  };

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