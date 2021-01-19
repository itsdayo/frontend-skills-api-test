import "./../style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipes,
  updateRecipes,
  getCurrentRecipe,
} from "../actions/recipes";
// import { storeIngredient } from "./actions";

const CloseModalButton = styled.button`
  position: "absolute";
  left: 4px;
  top: 4px;
`;

const SubmitEditButton = styled.button`
  position: "absolute";
  margin-left: 450px;
  margin-top: 15px;
`;

const Labels = styled.span`
  font-weight: 700;
  margin-left: 5px;
`;

function FoodList(props) {
  const history = useHistory();
  const reduxState = useSelector((state) => state.changeData);
  const recipes = useSelector((state) => state.recipes);
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [foodItem, setFoodItem] = useState({});
  const [formList, setFormList] = useState([]);
  const dispatch = useDispatch();
  console.log(recipes.recipesList);
  useEffect(() => {
    // retrieving data from the recipe  api
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => {
        setAllData(() => [...res.data]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    console.log(reduxState);
  }, []);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function openModal(foodItem) {
    setIsOpen(true);
    setFoodItem(foodItem);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function editItem(item) {
    let newDate = new Date();
    let minutes = newDate.getMinutes().toString();
    let month = newDate.getMonth() + 1;
    let newMonth = month.toString();
    let year = newDate.getFullYear().toString();
    let doubleDigitMin = "";
    let date = newDate.getDate().toString();
    let zero = "0";
    let hours = newDate.getHours().toString();
    let AMorPM = "";
    let seconds = newDate.getSeconds().toString();
    let doubleDigitSecs = "";
    let lastPortionOfTime = "";
    let doubleDigitMonth = "";
    let doubleDigitHour = "";

    if (minutes < 10) {
      doubleDigitMin = zero.concat(minutes);
    } else {
      doubleDigitMin = minutes;
    }

    if (newMonth < 10) {
      doubleDigitMonth = zero.concat(newMonth);
    } else {
      doubleDigitMonth = newMonth;
    }

    if (seconds < 10) {
      doubleDigitSecs = zero.concat(seconds);
    } else {
      doubleDigitSecs = seconds;
    }

    if (hours >= 12) {
      hours -= 12;
      AMorPM = " PM";
      lastPortionOfTime = doubleDigitSecs.concat(AMorPM);
    } else {
      AMorPM = " AM";
      lastPortionOfTime = doubleDigitSecs.concat(AMorPM);
    }

    if (parseInt(hours) < 10) {
      doubleDigitHour = zero.concat(hours);
    } else {
      doubleDigitHour = hours;
    }

    let dateTime =
      doubleDigitMonth +
      "/" +
      date +
      "/" +
      year +
      " " +
      doubleDigitHour +
      ":" +
      doubleDigitMin +
      ":" +
      lastPortionOfTime;

    let oldRecipe = foodItem;
    // const newRecipe = Object.assign({ cookTime: 31 }, oldRecipe);
    const newRecipe = JSON.parse(JSON.stringify(oldRecipe));

    newRecipe.cookTime = item.cookTime;
    newRecipe.description = item.description;
    newRecipe.prepTime = item.prepTime;
    newRecipe.servings = item.servings;
    newRecipe.title = item.title;
    newRecipe.editDate = dateTime;

    // axios
    //   .put(`http://localhost:3001/recipes/${foodItem.uuid}`, changedFoodItem)
    //   .then()
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    dispatch(updateRecipes(newRecipe));
    //console.log(newRecipe, item.cookTime);
    window.location.reload();
  }

  function viewDirections(foodItem) {
    history.push({
      pathname: `/directions/${foodItem.uuid}`,
      state: { foodItem: foodItem },
    });
  }

  function viewIngredients(foodItem) {
    // dispatch(getCurrentRecipe(foodItem));

    history.push({
      pathname: `/ingredients/${foodItem.uuid}`,
      state: { foodItem },
    });
  }

  async function storeIngredient() {
    dispatch(storeIngredient(foodItem));
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <CloseModalButton className="btn btn-secondary" onClick={closeModal}>
          X
        </CloseModalButton>
        <div className="modal-form">
          <h2>Edit the food item</h2>

          <Formik
            enableReinitialize
            initialValues={{
              title: foodItem.title,
              description: foodItem.description,
              servings: foodItem.servings,
              prepTime: foodItem.prepTime,
              cookTime: foodItem.cookTime,
            }}
            onSubmit={editItem}
            render={(formikProps) => (
              <Form>
                {/* here */}
                <div>
                  <div className="modal-food-name">
                    <label className="form-label">Name</label>
                    <Field
                      name="title"
                      type="text"
                      className="text-input"
                      placeholder="Enter a name"
                    />
                    <br />
                  </div>
                  {/* here */}
                  <div className="modal-food-description">
                    <label className="form-label">Description</label>
                    <Field
                      name="description"
                      type="text"
                      placeholder="Enter a description"
                      className="text-input"
                    />
                  </div>
                </div>
                <br />
                <div>
                  <div className="modal-food-servings">
                    <label className="form-label">Servings</label>

                    <Field name="servings">
                      {({ field, form, meta }) => (
                        <span>
                          <input
                            {...field}
                            type="number"
                            className="number-input"
                          />
                        </span>
                      )}
                    </Field>
                  </div>
                  <br />
                  {/* here */}
                  <div className="modal-preptime-cooktime-container">
                    <div className="modal-food-prepTime">
                      <label className="form-label">Prep Time (in mins)</label>
                      <Field name="prepTime">
                        {({ field, form, meta }) => (
                          <span>
                            <input
                              {...field}
                              type="number"
                              className="number-input"
                            />
                          </span>
                        )}
                      </Field>
                    </div>

                    {/* here */}
                    <div className="modal-food-cookTime">
                      <label className="form-label">Cook time (in mins)</label>
                      <Field name="cookTime" type="number">
                        {({ field, form, meta }) => (
                          <span>
                            <input
                              {...field}
                              type="number"
                              className="number-input"
                            />
                          </span>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>

                <SubmitEditButton className="btn btn-primary" type="submit">
                  Submit
                </SubmitEditButton>
              </Form>
            )}
          />
        </div>
      </Modal>
      {recipes.recipesList.map((item, index) => (
        <div key={index} className="food-card">
          <div className="food-card-content">
            {item.images != undefined ? (
              <div className="food-list-image-container">
                <img
                  className="food-list-image"
                  src={item.images.small}
                  alt="Sorry something went wrong"
                  height={100}
                  width={150}
                />
              </div>
            ) : (
              <div className="food-list-image-container">
                <img
                  className="food-list-image"
                  src="https://images.squarespace-cdn.com/content/v1/55ece940e4b048d1ed401c11/1450136257542-4DATU4KRB70MDENGJXJX/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwkCFOLgzJj4yIx-vIIEbyWWRd0QUGL6lY_wBICnBy59Ye9GKQq6_hlXZJyaybXpCc/X%3A++The+Unknown"
                  alt="Sorry something went wrong"
                  height={100}
                  width={150}
                />
              </div>
            )}
            <div className="food-list-description">
              <div className="food-card-text">
                <Labels>Name:</Labels> {item.title}{" "}
              </div>
              <div className="food-card-text">
                <Labels>Description:</Labels> {item.description}
              </div>
              <div className="food-card-text">
                <Labels>Serving:</Labels> {item.servings}
                <Labels>Prep Time: </Labels>
                {item.prepTime}
                <Labels>Cook time:</Labels> {item.cookTime}
              </div>
              <div className="food-card-text">
                <Labels>Posted on: </Labels> {item.postDate}
              </div>
              <div className="food-card-text">
                <Labels>Edited on: </Labels>
                <span>{item.editDate}</span>
              </div>
            </div>
          </div>
          <div className="food-card-buttons">
            <div className="edit-food-button-container">
              <button
                className=" btn btn-success"
                onClick={() => openModal(item)}
              >
                Edit{" "}
              </button>
            </div>
            <div>
              <button
                className="view-directions-button  btn btn-warning"
                onClick={() => viewDirections(item)}
              >
                View Directions
              </button>
              <button
                className="view-ingredients-button btn btn-dark"
                onClick={() => viewIngredients(item)}
              >
                {" "}
                View Ingredients
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
