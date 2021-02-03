import React, { useState, useEffect } from "react";
import "./../style.css";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentRecipe } from "../actions/recipes";
import AddDirection from "./AddDirectionModal";
import EditDirection from "./EditDirectionModal";

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

  directionsList: {
    marginLeft: 350,
  },
  gridList: {
    height: "auto",
    flexWrap: "wrap",

    overflow: "auto",
    paddingTop: 50,
  },

  card: {
    maxWidth: 345,
    width: 500,
    display: "block",
    overflowY: "scroll",
    marginLeft: 150,
  },

  directionsInstruction: {
    fontSize: 20,
  },
  directionsOptional: {
    fontSize: 18,
  },
}));

function Directions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [open, setOpen] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [currentDirection, setCurrentDirection] = useState({});
  const [currentDirectionIndex, setCurrentDirectionIndex] = useState(0);
  const classes = useStyles();

  //get current recipe by uuid in params
  useEffect(() => {
    dispatch(getCurrentRecipe(recipeId));
  }, []);

  const directions = useSelector(
    (state) => state.recipes.currentRecipe.directions
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleEditClose = (value) => {
    setOpenForEdit(false);
  };

  //push current recipe to state to prefill form
  const handleClickEditOpen = (tile, index) => {
    setCurrentDirection(tile);

    setCurrentDirectionIndex(index);
    setOpenForEdit(true);
  };

  //change option to show yes or no
  function changeOptionToString(value) {
    if (value === false || value === undefined || value === "") {
      return "No";
    } else {
      return "Yes";
    }
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Directions
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
              className={classes.specialsButton}
              color="inherit"
              onClick={handleClickOpen}
            >
              Add Direction
            </Button>
            <Button
              variant="outlined"
              className={classes.specialsButton}
              color="inherit"
              onClick={() => history.push("/")}
            >
              Go to Home Page
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <AddDirection open={open} onClose={handleClose} />
      <EditDirection
        currentDirection={currentDirection}
        open={openForEdit}
        index={currentDirectionIndex}
        onClose={handleEditClose}
      />
      <div className={classes.directionsList}>
        <Grid
          className={classes.gridList}
          container
          justify="center"
          spacing={1}
        >
          {directions.map((tile, index) => (
            <Grid container item xs={12} spacing={0.1}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      className="text-center"
                    >
                      <span className={classes.directionsInstruction}>
                        {tile.instructions}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      className="text-center"
                    >
                      <span className={classes.directionsOptional}>
                        {" "}
                        Optional: {changeOptionToString(tile.optional)}
                      </span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <Button
                    onClick={() => handleClickEditOpen(tile, index)}
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

export default Directions;
