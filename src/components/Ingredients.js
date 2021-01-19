import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./../style.css";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients, getRecipes, updateRecipes } from "../actions";
import {
  getCurrentRecipe,
  updateIngredient,
  saveRecipe,
} from "../actions/recipes";

const CloseModalButton = styled.button`
  position: "absolute";
  left: 4px;
  top: 4px;
`;

const IngredientButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;
const ModalAmount = styled.div`
  position: "absolute";
`;
const ModalMeasurement = styled.div`
  position: "absolute";
  margin-left: 250px;
  margin-top: -35px;
`;
const ModalName = styled.div`
  position: "absolute";
  margin-top: 20px;
`;

const Labels = styled.span`
  font-weight: 700;
  margin-left: 5px;
`;
const EditButton = styled.button`
  margin-left: 10px;
`;
const List = styled.li`
  margin-top: 15px;
`;
const AddIngredientForm = styled.div`
  margin-left: 30px;
  padding-bottom: 30px;
  margin-top: 40px;
`;
const AddFormAmount = styled.div`
  float: left;
`;

const AddFormMeasurement = styled.div`
  margin-left: 300px;
`;

const AddFormName = styled.div`
  margin-top: 15px;
  float: "left";
`;

const AddIngredientButton = styled.div`
  float: "right";
  position: relative;
  margin-left: 250px;
`;

function Ingredients(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(getCurrentRecipe(recipeId));
  }, []);

  const [allData, setAllData] = useState([]);
  // const ingredients = useSelector((state) => state.ingredients);
  const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

  const ingredients = useSelector(
    (state) => state.recipes.currentRecipe.ingredients
  );

  console.log(ingredients);

  const state = useSelector((state) => state);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const [foodItem, setFoodItem] = useState({});

  // useEffect(() => {
  //   // console.log(recipes.recipes);
  //   setAllIngredients(props.location.state.foodItem.ingredients);
  //   //dispatch(getIngredients(recipes.recipes[0]));
  //   console.log(ingredients.ingredientsList);
  //   console.log(props.location.state.foodItem.ingredients);
  //   //dispatch(getRecipes());
  // }, []);

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
  function navigateToHomePage() {
    history.push("/");
  }
  function openModal(foodItem, ingredient) {
    setIsOpen(true);
    console.log(ingredient);
    setSelectedIngredient(ingredient);
    setSelectedFoodItem(foodItem);
  }

  function closeModal() {
    setIsOpen(false);
    // dispatch(getIngredients(recipes.recipes[0]));
  }
  function handleSubmit(form) {
    const newIngredient = {
      uuid: selectedIngredient.uuid,
      amount: form.amount,
      name: form.name,
      measurement: form.measurement,
    };

    dispatch(updateIngredient(newIngredient));

    console.log("recipe", currentRecipe);

    dispatch(saveRecipe(currentRecipe));

    closeModal();
  }

  function addIngredient(item) {
    let newIngredient = item;
    newIngredient.uuid = uuidv4();
    // console.log(newIngredient);
    // let arr = allData;

    // let changedFoodItem = {};
    // console.log(props);

    // for (let i = 0; i <= arr.length - 1; i++) {
    //   if (arr[i].uuid === props.location.state.foodItem.uuid) {
    //     arr[i].ingredients.push(newIngredient);
    //     changedFoodItem = arr[i];
    //   }
    // }

    // const foodItem = ingredients.recipes[0];
    // const recipes = JSON.parse(JSON.stringify(ingredients.recipes[0]));

    // const ingredientsList = recipes.ingredients;
    // console.log(ingredientsList, foodItem);
    // console.log(recipes);
    // for (let i = 0; i <= ingredientsList.length - 1; i++) {
    //   if (ingredientsList[i].uuid === selectedIngredient.uuid) {
    // ingredientsList.push(newIngredient);
    //  break;
    //   }
    // }
    // recipes.ingredients = ingredientsList;

    // console.log(changedFoodItem);
    // console.log(arr);
    // axios
    //   .put(
    //     `http://localhost:3001/recipes/${props.location.state.foodItem.uuid}`,
    //     changedFoodItem
    //   )
    //   .then(() => setAllIngredients(() => [...changedFoodItem.ingredients]))
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    // dispatch(updateRecipes(recipes));
    // dispatch(getIngredients(recipes));
    // setAllIngredients(() => [...recipes.ingredients]);
    // setFoodItem(changedFoodItem);
    // dispatch(storeIngredient(changedFoodItem));
    //window.location.reload();
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
          <h4>Ingredient</h4>
          <Formik
            enableReinitialize
            initialValues={{
              amount: selectedIngredient.amount,
              measurement: selectedIngredient.measurement,
              name: selectedIngredient.name,
            }}
            onSubmit={handleSubmit}
            render={(formikProps) => (
              <Form>
                <div>
                  <ModalAmount>
                    <label className="form-label">Amount</label>
                    <Field
                      name="amount"
                      type="number"
                      step={0.1}
                      placeholder="How much?"
                      className="text-input"
                    />
                  </ModalAmount>
                  <ModalMeasurement>
                    <label className="form-label">Measurement</label>
                    <Field
                      name="measurement"
                      className="text-input-ingredients"
                    >
                      {({ field, form, meta }) => (
                        <span>
                          <input
                            placeholder="Ex. teaspoon"
                            {...field}
                            type="text"
                            className="text-input"
                          />
                        </span>
                      )}
                    </Field>
                  </ModalMeasurement>
                </div>
                <ModalName>
                  <label className="form-label">Name</label>
                  <Field name="name" type="text" className="text-input">
                    {({ field, form, meta }) => (
                      <span>
                        <input
                          {...field}
                          placeholder="Enter ingredient name"
                          type="text"
                          className="text-input"
                        />
                      </span>
                    )}
                  </Field>
                </ModalName>
                <IngredientButton className="btn btn-primary" type="submit">
                  Submit Ingredient
                </IngredientButton>
              </Form>
            )}
          />
        </div>
      </Modal>
      <button onClick={navigateToHomePage} className="btn btn-secondary">
        Back
      </button>
      <div className="ingredients-container">
        <h1 className="ingredients-header">Ingredients </h1>
        <div>
          <ul>
            {ingredients.map((item, index) => (
              <List key={index}>
                <Labels>Name:</Labels>
                {item.name} <Labels>Measurement:</Labels>
                {item.measurement} <Labels>Amount:</Labels>
                {item.amount}
                <EditButton onClick={() => openModal(foodItem, item)}>
                  Edit
                </EditButton>
              </List>
            ))}
          </ul>
          <AddIngredientForm>
            <Formik
              enableReinitialize
              initialValues={{}}
              onSubmit={addIngredient}
            >
              {(formikProps) => (
                <Form>
                  <div>
                    <AddFormAmount>
                      <label className="form-label">Amount</label>
                      <Field
                        name="amount"
                        type="number"
                        step={0.1}
                        placeholder="How much?"
                        className="text-input"
                      />
                    </AddFormAmount>
                    <AddFormMeasurement>
                      <label className="form-label">Measurement</label>
                      <Field
                        name="measurement"
                        className="text-input-ingredients"
                      >
                        {({ field, form, meta }) => (
                          <span>
                            <input
                              placeholder="Ex. teaspoon"
                              {...field}
                              type="text"
                              className="text-input"
                            />
                          </span>
                        )}
                      </Field>
                    </AddFormMeasurement>
                  </div>
                  <AddFormName>
                    <label className="form-label">Name</label>
                    <Field name="name" type="text" className="text-input">
                      {({ field, form, meta }) => (
                        <span>
                          <input
                            {...field}
                            placeholder="Enter ingredient name"
                            type="text"
                            className="text-input"
                          />
                        </span>
                      )}
                    </Field>
                  </AddFormName>
                  <AddIngredientButton
                    type="submit"
                    className="btn btn-warning"
                  >
                    Add Ingredient
                  </AddIngredientButton>
                </Form>
              )}
            </Formik>
          </AddIngredientForm>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
