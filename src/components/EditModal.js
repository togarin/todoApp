import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

const EditModal = ({ isOpen, onClose, onSubmit, todo, handleEditChange }) => {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Редактирование</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Измени ToDo-ху"
            type="text"
            fullWidth
            value={todo}
            onChange={(e) => handleEditChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Отмена
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditModal;
