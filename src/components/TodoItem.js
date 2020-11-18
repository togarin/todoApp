import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import EditModal from "../components/EditModal";
const useStyles = makeStyles({
  marked: {
    textDecoration: "line-through",
  }
});

const TodoItem = ({ todoItem, completedTodo, todos, setTodos }) => {
  const [todo, setTodo] = useState(todoItem.task);
  const [edit, setEdit] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState({ open: false });
  const classes = useStyles();
  const handleEditSubmit = (id) => {
    const editedItem = todos.map((itemTodo) => {
      if (itemTodo.id === id) {
        itemTodo.task = todo;
      }
      return itemTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedItem));
    setTodos(editedItem);
    setEdit(!edit);
  };
  const handleDelete = (todoId) => {
    const removeTodo = todos.filter((todoItem) => todoItem.id !== todoId);
    setTodos(removeTodo);
  };

  return (
    <React.Fragment>
      <List component="nav" className={classes}>
        <ListItem key={todoItem.id}>
          <Checkbox
            color="default"
            checked={todoItem.completed}
            onChange={() => completedTodo(todoItem.id)}
          />
          <ListItemText className={todoItem.completed ? classes.marked : ""}>
            {todoItem.task}
          </ListItemText>
          <small>{todoItem.createdOn}</small>
          <IconButton
            onClick={() => {
              setEditModalOpen({ open: true });
            }}
            disabled={todoItem.completed ? true : false}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(todoItem.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <Divider />
      </List>
      <EditModal
        isOpen={editModalOpen.open}
        onClose={() => {
          setEditModalOpen({ open: false });
        }}
        onSubmit={() => handleEditSubmit(todoItem.id)}
        todo={todo}
        handleEditChange={setTodo}
      />
    </React.Fragment>
  );
};

export default TodoItem;
