import React, { useState, useEffect } from "react";
import "./../style.css";

import { useSelector, useDispatch } from "react-redux";
import { getSpecials } from "../actions/specials";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";
import "./../style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  specialsButton: {},

  navButtonContainer: {
    marginRight: theme.spacing(3),
    right: 0,
    position: "absolute",
  },

  gridList: {
    height: "auto",
    flexWrap: "wrap",

    overflow: "auto",
    paddingTop: 50,
  },

  card: {
    width: 500,
    display: "block",
    overflowY: "scroll",
    marginLeft: 390,
  },
  boldText: {
    fontWeight: "bold",
  },
  specialsTitle: {},
}));

function Specials() {
  const dispatch = useDispatch();
  const specials = useSelector((state) => state.specials);
  const history = useHistory();
  const classes = useStyles();

  //retrieve all the specials in database
  useEffect(() => {
    dispatch(getSpecials());
  }, []);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Specials
          </Typography>
          <div className={classes.navButtonContainer}>
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

      <div className={classes.specialsList}>
        <Grid
          className={classes.gridList}
          container
          justify="center"
          spacing={1}
        >
          {specials &&
            specials.specialsList.map((tile, index) => (
              <Grid container item xs={12} spacing={0.1}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" className="text-center">
                        <span className="specials-title">{tile.title}</span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className="text-center"
                      >
                        <span classNane="specials-text">{tile.text}</span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className="text-center"
                      >
                        <span className="specails-type">
                          <span className="bold-text">type:</span> {tile.type}
                        </span>
                      </Typography>
                      {tile.code && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="div"
                          className="text-center"
                        >
                          <span className="specials-code">
                            <span className="bold-text">USE CODE:</span>{" "}
                            {tile.code}
                          </span>
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Specials;
