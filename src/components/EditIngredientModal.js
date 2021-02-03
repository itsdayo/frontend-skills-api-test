import React, { useState, useEffect } from "react";

import {
  Button,
  TextField,
  InputLabel,
  DialogTitle,
  Dialog,
  Box,
  makeStyles,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import { updateIngredient, saveCurrentRecipe } from "../actions/recipes";

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
    marginLeft: 90,
    marginTop: 50,
  },
}));

function EditIngredient(props) {
  const classes = useStyles();
  const { onClose, open, currentIngredient } = props;
  const dispatch = useDispatch();

  const [name, setName] = useState(currentIngredient.name);
  const [measurement, setMeasurement] = useState(currentIngredient.measurement);
  const [amount, setAmount] = useState(currentIngredient.amount);
  console.log(currentIngredient);
  useEffect(() => {
    //get recipes for state
    setName(currentIngredient.name);
    setMeasurement(currentIngredient.measurement);
    setAmount(currentIngredient.amount);
  }, [
    currentIngredient.name,
    currentIngredient.measurement,
    currentIngredient.amount,
  ]);

  // close modal
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

  function editItem() {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    //new ingredient with form data

    const newIngredient = {
      uuid: currentIngredient.uuid,
      amount: amount,
      name: name,
      measurement: measurement,
    };

    //update ingredient in redux
    dispatch(updateIngredient(newIngredient));
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
            value={name}
          />
          <InputLabel id="measurement">Measurement</InputLabel>
          <TextField
            id="measurement"
            placeholder="Enter the meausrement"
            onChange={handleMeasurementChange}
            value={measurement}
          />
          <InputLabel id="amount">Amount</InputLabel>
          <TextField
            id="amount"
            type="number"
            placeholder="Enter the amount"
            onChange={handleAmountChange}
            value={amount}
          />
        </div>
      </form>

      <Box mb={3} ml={25} pb={3}>
        <Button
          onClick={editItem}
          size="medium"
          variant="contained"
          color="primary"
        >
          Finished Editing
        </Button>
      </Box>
    </Dialog>
  );
}
export default EditIngredient;
