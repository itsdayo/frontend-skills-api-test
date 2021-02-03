import React, { useState, useEffect } from "react";

import {
  Button,
  TextareaAutosize,
  InputLabel,
  DialogTitle,
  Dialog,
  Select,
  Box,
  MenuItem,
  FormControl,
  makeStyles,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import { saveCurrentRecipe, updateDirection } from "../actions/recipes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& .instruction-text-area": {
      margin: theme.spacing(1),
      width: "25ch",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
    },
    "& .optionalFormControl": {
      margin: theme.spacing(1),
      width: "25ch",
    },

    paddingBottom: 40,
    marginLeft: 90,
    marginTop: 50,
  },
}));

function EditDirection(props) {
  const classes = useStyles();
  const { onClose, open, currentDirection, index } = props;
  const dispatch = useDispatch();
  const [openOptions, setOptionsOpen] = React.useState(false);
  const [instruction, setInstruction] = useState(currentDirection.instructions);
  const [optional, setOptional] = useState(currentDirection.optional);

  useEffect(
    () => {
      //set driection information to state
      setInstruction(currentDirection.instructions);
      setOptional(currentDirection.optional);
    },
    [currentDirection.instruction, currentDirection.optional],
    index
  );
  const handleClose = () => {
    onClose();
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };
  const handleOptionsChange = (e) => {
    setOptional(e.target.value);
  };
  const handleOptionsClose = () => {
    setOptionsOpen(false);
  };
  const handleOptionsOpen = () => {
    setOptionsOpen(true);
  };

  function editItem() {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    //creating a new direction
    const newDirection = {
      instructions: instruction,
      optional: optional,
    };

    dispatch(updateDirection(newDirection, index));
    dispatch(saveCurrentRecipe());

    handleClose();
  }

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="edit-ingredient"
      open={open}
    >
      <DialogTitle id="edit-ingredient">Edit Ingredient</DialogTitle>

      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <InputLabel id="instruction">Instruction</InputLabel>
          <TextareaAutosize
            rowsMax={4}
            aria-label="instruction"
            placeholder="Enter an instruction"
            className="instruction-text-area"
            onChange={handleInstructionChange}
            value={instruction}
          />
          <InputLabel id="measurement">Measurement</InputLabel>
          <FormControl className="optionalFormControl">
            <InputLabel className="optional" id="optional">
              Optional
            </InputLabel>
            <Select
              labelId="optional"
              id="demo-controlled-open-select"
              className="optionalLabel"
              open={openOptions}
              onClose={handleOptionsClose}
              onOpen={handleOptionsOpen}
              onChange={handleOptionsChange}
              value={optional}
            >
              <MenuItem value={false}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>

      <Box mb={3} ml={25} pb={3}>
        <Button
          onClick={editItem}
          size="medium"
          variant="contained"
          color="primary"
        >
          Edit Direction
        </Button>
      </Box>
    </Dialog>
  );
}
export default EditDirection;
