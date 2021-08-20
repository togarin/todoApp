import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TodoItem from "./TodoItem";
import EditModal from "../components/EditModal";

const TodoList = () => {
  const [editModalState, setEditModalState] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    localStorage.items
      ? setTodos(JSON.parse(localStorage.getItem("items")))
      : setTodos([]);
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;

    let todoObj = {
      id: `f${(+new Date()).toString(16)}`,
      task: todo,
      completed: false,
      createdOn: new Date().toLocaleString(),
    };
    updateTodos([...todos, todoObj]);
    setTodo("");
  };
  
  const handleComplete = (id) => {
    const updatedItems = todos.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    updateTodos(updatedItems);
  };
  const handleDelete = (todoId) => {
    const removeTodo = todos.filter((todoItem) => todoItem.id !== todoId);
    updateTodos(removeTodo);
  };

  const updateTodos = (todos) => {
    localStorage.setItem("items", JSON.stringify(todos));
    setTodos(todos);
  };
  const handleEditSubmit = () => {
    if (!editModalState) return;
    const { id, task } = editModalState;
    const editedItems = todos.map((itemTodo) =>
      itemTodo.id === id ? { ...itemTodo, task } : itemTodo
    );
    updateTodos(editedItems);
  };
  todos.sort((a, b) => a.completed - b.completed);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component={Paper} elevation={10}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Пиши тут"
            fullWidth
            value={todo}
            onChange={handleChange}
          />
          <IconButton type="submit">
            <AddBoxIcon />
          </IconButton>
        </form>
        {todos.length > 0 ? (
          todos.map((todoItem) => (
            <TodoItem
              onDelete={() => handleDelete(todoItem.id)}
              onComplete={() => handleComplete(todoItem.id)}
              todoItem={todoItem}
              key={todoItem.id}
              todos={todos}
              setTodos={setTodos}
              onEdit={() =>
                setEditModalState({ task: todoItem.task, id: todoItem.id })
              }
            />
          ))
        ) : (
          <List component="nav">
            <ListItem>
              <ListItemText>Заданий нет</ListItemText>
            </ListItem>
            <Divider />
          </List>
        )}
        {!!editModalState && (
          <EditModal
            isOpen
            onClose={() => {
              setEditModalState(null);
            }}
            onSubmit={handleEditSubmit}
            task={editModalState.task}
            handleEditChange={(task) =>
              setEditModalState({ ...editModalState, task })
            }
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default TodoList;
