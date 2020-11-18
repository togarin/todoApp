import React, { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  //   TextField,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';

const PriorityModal = ({ isOpen, onClose, onSubmit }) => {
  const [prioritys, setPriorytys] = useState([
    { id: 1, text: "important", color: "red", appointed: false },
    { id: 2, text: "middle", color: "orange", appointed: false },
    { id: 3, text: "low", color: "green", appointed: false },
  ]);

  const assignedPriority = (index) => {
    const newItem = prioritys.map((item) => {
      if (item.id === index) {
        item.appointed = !item.appointed;
      }
      return item;
    });
    setPriorytys(newItem);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogContent>
          <DialogContentText>Назначить приоритет?</DialogContentText>
          {/* <List className={classes.root}> */}
          <List>
            {prioritys.map((value) => {
              return (
                <ListItem key={value.id} dense button>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      onChange={() => assignedPriority(value.id)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value.text} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={onClose}>
            Нет
          </Button>
          <Button
            color="default"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PriorityModal;
