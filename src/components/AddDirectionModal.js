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
import { postDirection, saveCurrentRecipe } from "../actions/recipes";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 100,
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
    marginLeft: 100,
    marginTop: 50,
  },
  addRecipeButton: {
    marginLeft: 40,
    position: "absolute",
  },
}));

function AddDirection(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [optional, setOptional] = useState(false);
  const [instruction, setInstruction] = useState("");
  const dispatch = useDispatch();
  const [openOptions, setOptionsOpen] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  //close options modal
  const handleOptionsClose = () => {
    setOptionsOpen(false);
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleOptionsOpen = () => {
    setOptionsOpen(true);
  };

  const handleOptionsChange = (e) => {
    setOptional(e.target.value);
  };

  //add direction to state and save the current recipe
  function addDirection() {
    const newDirection = {
      instructions: instruction,
      optional,
    };

    dispatch(postDirection(newDirection));
    dispatch(saveCurrentRecipe());
    handleClose();
  }

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="edit-direction"
      open={open}
    >
      <DialogTitle id="edit-direction">Edit Direction</DialogTitle>

      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <InputLabel id="instruction">Instruction</InputLabel>
          <TextareaAutosize
            rowsMax={4}
            aria-label="instruction"
            placeholder="Enter an instruction"
            className="instruction-text-area"
            onChange={handleInstructionChange}
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
          onClick={addDirection}
          size="medium"
          variant="contained"
          color="primary"
        >
          Add Direction
        </Button>
      </Box>
    </Dialog>
  );
}
export default AddDirection;
