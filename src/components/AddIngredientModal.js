import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  InputLabel,
  DialogTitle,
  Dialog,
  makeStyles,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { postIngredient, saveCurrentRecipe } from "../actions/recipes";

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
    marginLeft: 100,
    marginTop: 50,
  },
}));

function AddIngredient(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [measurement, setMeasurement] = useState("");

  //close modal
  const handleClose = () => {
    onClose();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMeasurementChange = (e) => {
    setMeasurement(e.target.value);
  };

  const dispatch = useDispatch();

  //add ingredient
  function addIngredient() {
    const newIngredient = {
      uuid: uuidv4(),
      amount: amount,
      name: name,
      measurement: measurement,
    };

    dispatch(postIngredient(newIngredient));
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
          <InputLabel id="name">Name</InputLabel>
          <TextField
            id="name"
            placeholder="Enter the amount of servings"
            onChange={handleNameChange}
          />
          <InputLabel id="measurement">Measurement</InputLabel>
          <TextField
            id="measurement"
            placeholder="Enter the meausrement"
            onChange={handleMeasurementChange}
          />
          <InputLabel id="amount">Amount</InputLabel>
          <TextField
            id="amount"
            type="number"
            placeholder="Enter the amount"
            onChange={handleAmountChange}
          />
        </div>
      </form>

      <Box mb={3} ml={25} pb={3}>
        <Button
          onClick={addIngredient}
          size="medium"
          variant="contained"
          color="primary"
        >
          Add Ingredient
        </Button>
      </Box>
    </Dialog>
  );
}
export default AddIngredient;
