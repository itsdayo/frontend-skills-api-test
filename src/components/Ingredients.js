import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./../style.css";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory } from "react-router-dom";
const CloseModalButton = styled.button`
  position: "absolute";
  left: 4px;
  top: 4px;
`;
const IngredientButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;
function Ingredients(props) {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const [foodItem, setFoodItem] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => {
        setAllData(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setAllIngredients(props.location.state.foodItem.ingredients);
    setFoodItem(props.location.state.foodItem);
  }, []);

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
  function openModal(foodItem, ingredient) {
    setIsOpen(true);
    console.log(ingredient);
    setSelectedIngredient(ingredient);
    setSelectedFoodItem(foodItem);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleSubmit(item) {
    item.uuid = uuidv4();

    let foodItem = selectedFoodItem;
    let ingredients = selectedFoodItem.ingredients;
    console.log(ingredients);
    for (let i = 0; i <= ingredients.length - 1; i++) {
      if (ingredients[i].uuid === selectedIngredient.uuid) {
        ingredients[i] = item;
        break;
      }
    }
    foodItem.ingredients = ingredients;
    axios
      .put(`http://localhost:3001/recipes/${foodItem.uuid}`, foodItem)
      .then(() => closeModal());
    setAllIngredients(() => [...foodItem.ingredients]);
    setFoodItem(foodItem);
  }

  function addIngredient(item) {
    let newIngredient = item;
    newIngredient.uuid = uuidv4();
    console.log(newIngredient);
    let arr = allData;

    let changedFoodItem = {};
    console.log(props);

    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i].uuid === props.location.state.foodItem.uuid) {
        arr[i].ingredients.push(newIngredient);
        changedFoodItem = arr[i];
      }
    }
    console.log(changedFoodItem);
    console.log(arr);
    axios
      .put(
        `http://localhost:3001/recipes/${props.location.state.foodItem.uuid}`,
        changedFoodItem
      )
      .then(() => setAllIngredients(() => [...changedFoodItem.ingredients]))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setFoodItem(changedFoodItem);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <CloseModalButton className="btn btn-secondary" onClick={closeModal}>
          X
        </CloseModalButton>
        <div className="ingredient-form">
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
                <div style={{ position: "absolute", float: "left" }}>
                  <label className="form-label">Amount</label>
                  <Field
                    name="amount"
                    type="number"
                    step={0.1}
                    placeholder="How much?"
                    className="text-input"
                  />
                </div>
                <div style={{ marginLeft: 250 }}>
                  <label className="form-label">Measurement</label>
                  <Field name="measurement" className="text-input-ingredients">
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
                </div>
                <div style={{ postion: "absolute", marginTop: 15 }}>
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
                </div>
                <IngredientButton className="btn btn-primary" type="submit">
                  Submit Ingredient
                </IngredientButton>
              </Form>
            )}
          />
        </div>
      </Modal>

      <div className="ingredients-container">
        <h1 className="ingredients-header">Ingredients </h1>
        <div style={{ marginTop: 15 }}>
          <ul>
            {allIngredients.map((item, index) => (
              <li style={{ marginTop: 15 }} key={index}>
                <span style={{ fontWeight: "bold" }}>Name:</span>
                {item.name}{" "}
                <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Measurement:
                </span>
                {item.measurement}{" "}
                <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Amount:
                </span>
                {item.amount}
                <button
                  onClick={() => openModal(foodItem, item)}
                  style={{ marginLeft: 5 }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginLeft: 30, paddingBottom: 30 }}>
            <Formik
              enableReinitialize
              initialValues={{}}
              onSubmit={addIngredient}
            >
              {(formikProps) => (
                <Form>
                  <div style={{ position: "absolute", float: "left" }}>
                    <label className="form-label">Amount</label>
                    <Field
                      name="amount"
                      type="number"
                      step={0.1}
                      placeholder="How much?"
                      className="text-input"
                    />
                  </div>
                  <div style={{ marginLeft: 250 }}>
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
                  </div>
                  <div
                    style={{
                      float: "left",
                      postion: "absolute",
                      marginTop: 15,
                    }}
                  >
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
                  </div>
                  <button
                    type="submit"
                    style={{ marginTop: 15, marginLeft: 20 }}
                    className="btn btn-warning"
                  >
                    Add Ingredient
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* <button
          className="btn btn-warning"
          style={{ position: "relative", marginBottom: 5, marginLeft: 400 }}
        >
          Add an ingredient
        </button> */}
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
