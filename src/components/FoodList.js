import "./../style.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipes,
  updateRecipe,
  saveCurrentRecipe,
} from "../actions/recipes";
import moment from "moment";

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
const Button = styled.button`
  width: 120px;
`;

function FoodList() {
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    //get recipes for state
    dispatch(getRecipes());
  }, []);

  //set selected for item to edit to state
  function openModal(foodItem) {
    setIsOpen(true);
    setSelectedFoodItem(foodItem);
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

  //after open modal edit recipe and dispatch it to redux state
  function editItem(form) {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    //new recipe with form data
    const newRecipe = {
      uuid: selectedFoodItem.uuid,
      title: form.title,
      description: form.description,
      servings: form.servings,
      prepTime: form.prepTime,
      cookTime: form.cookTime,
      editDate: dateAndTime,
      images: selectedFoodItem.images,
      directions: selectedFoodItem.directions,
      ingredients: selectedFoodItem.ingredients,
    };

    //dipatch recipe to update
    dispatch(updateRecipe(newRecipe));
    dispatch(saveCurrentRecipe());

    closeModal();
  }

  function viewDirections(foodItem) {
    history.push({
      pathname: `/directions/${foodItem.uuid}`,
    });
  }

  function viewIngredients(foodItem) {
    history.push({
      pathname: `/ingredients/${foodItem.uuid}`,
    });
  }

  return (
    <React.Fragment>
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
                title: selectedFoodItem.title,
                description: selectedFoodItem.description,
                servings: selectedFoodItem.servings,
                prepTime: selectedFoodItem.prepTime,
                cookTime: selectedFoodItem.cookTime,
              }}
              onSubmit={editItem}
            >
              {(formikProps) => (
                <Form>
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

                    <div className="modal-preptime-cooktime-container">
                      <div className="modal-food-prepTime">
                        <label className="form-label">
                          Prep Time (in mins)
                        </label>
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

                      <div className="modal-food-cookTime">
                        <label className="form-label">
                          Cook time (in mins)
                        </label>
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
            </Formik>
          </div>
        </Modal>
        {recipes.recipesList &&
          recipes.recipesList.map((item, index) => (
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
              <div>
                <div className="row food-card-buttons">
                  <div style={{ marginRight: 5 }} className="col">
                    <Button
                      className=" btn btn-success"
                      onClick={() => openModal(item)}
                    >
                      Edit{" "}
                    </Button>
                  </div>
                  <div className="button-move-left col">
                    <Button
                      className=" btn  btn-warning"
                      onClick={() => viewDirections(item)}
                    >
                      Directions
                    </Button>
                  </div>
                  <div className="bottom-move-left col">
                    <Button
                      className=" btn  btn-dark"
                      onClick={() => viewIngredients(item)}
                    >
                      Ingredients
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default FoodList;
