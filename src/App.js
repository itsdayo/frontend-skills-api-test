import React, { useState, useEffect } from "react";

import "./style.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

import { getRecipes } from "../src/actions";
import Ingredients from "./components/Ingredients";
import Directions from "./components/Directions";
import AddRecipe from "./components/AddRecipeModal";
import EditRecipe from "./components/EditRecipeModal";
const BoldText = styled.span`
  font-weight: 700;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  specialsButton: {},
  addRecipeButton: {
    left: 10,
  },
  navButtonContainer: {
    marginRight: theme.spacing(3),
    right: 0,
    position: "absolute",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  recipeList: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 40,
  },
  gridList: {
    height: "auto",
    flexWrap: "wrap",

    overflow: "auto",
  },

  card: {
    maxWidth: 345,
    display: "block",
    overflowY: "scroll",

    height: "35vw",

    backgroundColor: "#ffefd5",
  },
  media: {
    height: 400,
    paddingTop: "56.25%", // 16:9
    marginTop: -190,
  },
}));

function App() {
  const classes = useStyles();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);

  const [directions, setDirections] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [open, setOpen] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  //open new add new recipe
  const handleClickOpen = () => {
    setOpen(true);
  };

  //open edit recipe modal
  const handleClickEditOpen = (tile) => {
    setCurrentRecipe(tile);
    setOpenForEdit(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleEditClose = (value) => {
    setOpenForEdit(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    //get recipes for state
    dispatch(getRecipes());
  }, []);

  const handleNavigateDirectionsClick = (foodItem) => {
    history.push({
      pathname: `/directions/${foodItem.uuid}`,
    });
  };
  const handleNavigateIngredientsClick = (foodItem) => {
    history.push({
      pathname: `/ingredients/${foodItem.uuid}`,
    });
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Recipe List
          </Typography>
          <div className={classes.navButtonContainer}>
            <Button
              variant="outlined"
              className={classes.specialsButton}
              color="inherit"
              onClick={() => history.push("/specials")}
            >
              View the Specials
            </Button>
            <Button
              variant="outlined"
              className={classes.addRecipeButton}
              color="inherit"
              onClick={handleClickOpen}
            >
              Add Recipe
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <AddRecipe open={open} onClose={handleClose} />
      <EditRecipe
        currentRecipe={currentRecipe}
        open={openForEdit}
        onClose={handleEditClose}
      />
      <div className={classes.recipeList}>
        <Grid
          className={classes.gridList}
          container
          justify="center"
          spacing={1}
        >
          {recipes.recipesList.map((tile, index) => (
            <Grid container item xs={12} sm={6} md={4} spacing={0.01}>
              <Card>
                <CardActionArea>
                  {tile.images && (
                    <CardMedia
                      className={classes.media}
                      image={tile.images.medium}
                      title="Paella dish"
                      component="img"
                    />
                  )}
                  {!tile.images && (
                    <CardMedia
                      className={classes.media}
                      src={
                        "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg"
                      }
                      title="Paella dish"
                      component="img"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tile.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {tile.description}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      variant="body2"
                      component="div"
                    >
                      Servings: {tile.servings}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      gutterBottom
                    >
                      Prep time: {tile.prepTime}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      gutterBottom
                    >
                      Cook time: {tile.cookTime}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      gutterBottom
                    >
                      Posted: {tile.postDate}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      gutterBottom
                    >
                      Edited: {tile.editDate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <Button
                    onClick={() => handleNavigateDirectionsClick(tile)}
                    size="small"
                    color="primary"
                  >
                    View Directions
                  </Button>
                  <Button
                    onClick={() => handleNavigateIngredientsClick(tile)}
                    size="small"
                    color="primary"
                  >
                    View Ingredients
                  </Button>
                  <Button
                    onClick={() => handleClickEditOpen(tile)}
                    size="small"
                    color="primary"
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default App;
