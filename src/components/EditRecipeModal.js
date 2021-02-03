import React, { useState, useEffect } from "react";

import {
  makeStyles,
  InputLabel,
  DialogTitle,
  Dialog,
  Box,
  Grid,
  Button,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";

import styled from "styled-components";

import { updateRecipe, saveCurrentRecipe } from "../actions/recipes";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

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
    marginTop: 50,
  },
}));

function EditRecipe(props) {
  const classes = useStyles();
  const { onClose, open, currentRecipe } = props;
  const dispatch = useDispatch();

  console.log(currentRecipe.title);

  const [title, setTitle] = useState(currentRecipe.title);
  const [description, setDescription] = useState(currentRecipe.description);
  const [servings, setServings] = useState(currentRecipe.servings);
  const [prepTime, setPrepTime] = useState(currentRecipe.prepTime);
  const [cookTime, setCookTime] = useState(currentRecipe.cookTime);
  useEffect(() => {
    //get set state to recipe data
    setTitle(currentRecipe.title);
    setDescription(currentRecipe.description);
    setServings(currentRecipe.servings);
    setPrepTime(currentRecipe.prepTime);
    setCookTime(currentRecipe.cookTime);
  }, [
    currentRecipe.title,
    currentRecipe.description,
    currentRecipe.servings,
    currentRecipe.prepTime,
    currentRecipe.cookTime,
  ]);

  //close the add new recipe modal
  const handleClose = () => {
    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleServingsChange = (e) => {
    setServings(e.target.value);
  };
  const handlePrepTimeChange = (e) => {
    setPrepTime(e.target.value);
  };

  const handleCookTimeChange = (e) => {
    setCookTime(e.target.value);
    console.log(e.target.value);
  };

  function editItem(form) {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    //new recipe with form data
    const newRecipe = {
      uuid: currentRecipe.uuid,
      title: title,
      description: description,
      servings: servings,
      prepTime: prepTime,
      cookTime: cookTime,
      postDate: currentRecipe.postDate,
      editDate: dateAndTime,
      images: currentRecipe.images,
      directions: currentRecipe.directions,
      ingredients: currentRecipe.ingredients,
    };
    console.log(newRecipe);

    //dipatch recipe to update
    dispatch(updateRecipe(newRecipe));
    dispatch(saveCurrentRecipe());

    handleClose();
  }

  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="edit-recipe"
      open={open}
    >
      <DialogTitle id="edit-recipe">Edit Recipe</DialogTitle>

      <Grid justify="center" container spacing={12}>
        <Grid container item xs={6} spacing={3}>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <InputLabel id="title">Title of Food</InputLabel>
              <TextField
                id="title"
                placeholder="Enter a name"
                onChange={handleTitleChange}
                value={title}
              />
              <InputLabel id="description">Description</InputLabel>
              <TextareaAutosize
                id="description"
                rowsMax={4}
                aria-label="description"
                placeholder="Enter a description"
                className="instruction-text-area"
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
          </form>
        </Grid>
        <Grid container item xs={6} spacing={3}>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <InputLabel id="servings">Servings</InputLabel>
              <TextField
                id="servings"
                type="number"
                placeholder="Enter the amount of servings"
                onChange={handleServingsChange}
                value={servings}
              />
              <InputLabel id="prepTime">Prep Time (in mins)</InputLabel>
              <TextField
                id="prepTime"
                type="number"
                placeholder="Enter the prep time"
                onChange={handlePrepTimeChange}
                value={prepTime}
              />
              <InputLabel id="cookTime">Cook Time (in mins)</InputLabel>
              <TextField
                id="cookTime"
                type="number"
                placeholder="Enter the cook time"
                onChange={handleCookTimeChange}
                value={cookTime}
              />
            </div>
          </form>
        </Grid>
      </Grid>
      <Box mb={3} ml={50} pb={3}>
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
export default EditRecipe;
