import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./../style.css";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRecipe,
  updateIngredient,
  saveCurrentRecipe,
  postIngredient,
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

function Ingredients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(getCurrentRecipe(recipeId));
  }, []);

  const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

  const ingredients = useSelector(
    (state) => state.recipes.currentRecipe.ingredients
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const [foodItem, setFoodItem] = useState({});

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
  //set the selected ingredient arr and food item object to state
  function openModal(foodItem, ingredient) {
    setIsOpen(true);
    setSelectedIngredient(ingredient);
    setSelectedFoodItem(foodItem);
    console.log(ingredient);
  }

  function closeModal() {
    setIsOpen(false);
    // dispatch(getIngredients(recipes.recipes[0]));
  }

  //edit ingredient
  function handleSubmit(form) {
    const newIngredient = {
      uuid: selectedIngredient.uuid,
      amount: form.amount,
      name: form.name,
      measurement: form.measurement,
    };

    dispatch(updateIngredient(newIngredient));

    dispatch(saveCurrentRecipe());

    closeModal();
  }

  //add ingredient
  function addIngredient(form) {
    const newIngredient = {
      uuid: uuidv4(),
      amount: form.values.amount,
      name: form.values.name,
      measurement: form.values.measurement,
    };

    dispatch(postIngredient(newIngredient));
    dispatch(saveCurrentRecipe());
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
          >
            {(formikProps) => (
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
          </Formik>
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
              validator={() => ({})}
              enableReinitialize
              initialValues={{}}
              //onSubmit={add}
            >
              {(formikProps) => (
                <Form id="ingredientForm">
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
                    type="button"
                    className="btn btn-warning"
                    onClick={() => addIngredient(formikProps)}
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
