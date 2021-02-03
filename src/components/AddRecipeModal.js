import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  InputLabel,
  DialogTitle,
  Dialog,
  Select,
  Box,
  MenuItem,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { postNewRecipe } from "../actions/recipes";

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

function AddRecipe(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [measurement, setMeasurement] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [optional, setOptional] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [openOptions, setOptionsOpen] = React.useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDriections] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const handleOptionsClose = () => {
    setOptionsOpen(false);
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
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

  //open the options list
  const handleOptionsOpen = () => {
    setOptionsOpen(true);
  };

  const handleOptionsChange = (e) => {
    setOptional(e.target.value);
  };

  //add Direction to a list before submitting
  function addDirection() {
    const arr = directions;
    const formDirection = {};
    formDirection["optional"] = optional;
    formDirection["instruction"] = instruction;

    if (optional === true) {
      formDirection.optional = "Yes";
    }
    if (optional === false) {
      formDirection.optional = "No";
    }
    arr.push(formDirection);
    setDriections(() => [...arr]);
  }

  const dispatch = useDispatch();

  //form for submitting a new recipe
  function addFoodItem() {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    const newRecipe = {
      uuid: uuidv4(),
      title: title,
      description: description,
      servings: servings,
      cookTime: cookTime,
      prepTime: prepTime,
      ingredients: ingredients,
      directions: directions,
      postDate: dateAndTime,
    };

    onClose();

    dispatch(postNewRecipe(newRecipe));
  }

  //create ingredients for recipe
  function addIngredient(data) {
    let arr = ingredients;
    const formInstruction = {};
    formInstruction["name"] = name;
    formInstruction["amount"] = amount;
    formInstruction["measurement"] = measurement;
    formInstruction.uuid = uuidv4();

    arr.push(formInstruction);
    setIngredients(() => [...arr]);
    console.log(ingredients);
  }

  return (
    <Dialog
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="add-recipe"
      open={open}
    >
      <DialogTitle id="add-recipe">Add Recipe</DialogTitle>

      <Grid justify="center" container spacing={12}>
        <Grid container item xs={4} spacing={3}>
          <form className={classes.form} noValidate autoComplete="off">
            <h6>Food definition</h6>
            <div>
              <TextField
                id="title"
                label="The name of the food"
                placeholder="Enter a name"
                onChange={handleTitleChange}
              />
              <TextareaAutosize
                rowsMax={4}
                aria-label="description"
                placeholder="Enter a description"
                className="instruction-text-area"
                onChange={handleDescriptionChange}
              />

              <TextField
                id="servings"
                label="Servings"
                type="number"
                placeholder="Enter the amount of servings"
                onChange={handleServingsChange}
              />
              <TextField
                id="prepTime"
                type="number"
                label="Prep time (in mins)"
                placeholder="Enter the prep time"
                onChange={handlePrepTimeChange}
              />
              <TextField
                id="cookTime"
                label="Cook time (in mins)"
                type="number"
                placeholder="Enter the cook time"
                onChange={handleCookTimeChange}
              />
            </div>
          </form>
        </Grid>
        <Grid container item xs={4} spacing={1}>
          <form className={classes.form} noValidate autoComplete="off">
            <h6>Ingredients definition</h6>
            <div>
              <TextField
                id="name"
                label="Ingredient Name"
                placeholder="Enter the ingredient name"
                onChange={handleNameChange}
              />
              <TextField
                id="amount"
                label="Amount"
                placeholder="Enter the amount"
                inputProps={{
                  step: 0.1,
                }}
                type="number"
                onChange={handleAmountChange}
              />
              <TextField
                id="measurement"
                label="Mesurement"
                placeholder="Enter the measurement"
                onChange={handleMeasurementChange}
              />
              <Button
                onClick={addIngredient}
                variant="contained"
                color="secondary"
              >
                Add Ingredient to List
              </Button>
            </div>
          </form>
          <ul>
            {ingredients.map((item, index) => (
              <li>
                <Typography gutterBottom variant="body2" component="p">
                  <span className="bold-text">Name</span> {item.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  <span className="bold-text">Amount:</span> {item.amount}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  <span className="bold-text">Mesurement</span>{" "}
                  {item.measurement}
                </Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid container item xs={4} spacing={3}>
          <form className={classes.form} noValidate autoComplete="off">
            <h6>Direction definition</h6>
            <div>
              <TextareaAutosize
                rowsMax={4}
                aria-label="instruction"
                placeholder="Enter an instruction"
                className="instruction-text-area"
                onChange={handleInstructionChange}
              />
              <FormControl className="optionalFormControl">
                <InputLabel
                  className="optional"
                  id="demo-controlled-open-select-label"
                >
                  Optional
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
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
              <Button
                onClick={addDirection}
                variant="contained"
                color="secondary"
              >
                Add Direction to List
              </Button>
            </div>
          </form>
          <Box mb={15}>
            <ul>
              {directions.map((item, index) => (
                <li>
                  <Typography gutterBottom variant="body2" component="p">
                    <span className="bold-text">Instruction</span>{" "}
                    {item.instruction}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="p">
                    <span className="bold-text">Optional</span> {item.optional}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
      <Box mb={3} ml={140} pb={30}>
        <Button
          onClick={addFoodItem}
          size="medium"
          variant="contained"
          color="primary"
        >
          Add Recipe
        </Button>
      </Box>
    </Dialog>
  );
}
export default AddRecipe;
