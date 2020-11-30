import React from "react";
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
const useStyles = makeStyles({
  marked: {
    textDecoration: "line-through",
  },
});

const TodoItem = ({ todoItem, onComplete, onDelete, onEdit }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <List component="nav" className={classes}>
        <ListItem key={todoItem.id}>
          <Checkbox
            color="default"
            checked={todoItem.completed}
            onChange={onComplete}
          />
          <ListItemText className={todoItem.completed ? classes.marked : ""}>
            {todoItem.task}
          </ListItemText>
          <small>{todoItem.createdOn}</small>
          <IconButton
            onClick={onEdit}
            disabled={todoItem.completed ? true : false}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <Divider />
      </List>
    </React.Fragment>
  );
};

export default TodoItem;
