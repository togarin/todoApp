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

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    localStorage.items
      ? JSON.parse(localStorage.getItem("items"))
      : setTodos([]);
  }, []);
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    let todoObj = {
      id: todos.length + 1,
      task: todo,
      completed: false,
      createdOn: new Date().toLocaleString(),
    };
    localStorage.setItem("items", JSON.stringify([...todos, todoObj]));
    setTodos([...todos, todoObj]);
    setTodo("");
  };
  const completedTodo = (index) => {
    const newItem = todos.map((item) => {
      if (item.id === index) {
        item.completed = !item.completed;
      }
      return item;
    });
    localStorage.setItem("items", JSON.stringify(newItem));
    setTodos(newItem);
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
              todoItem={todoItem}
              key={todoItem.id}
              completedTodo={completedTodo}
              todos={todos}
              setTodos={setTodos}
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
      </Container>
    </React.Fragment>
  );
};

export default TodoList;
