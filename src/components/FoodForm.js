import { Formik, Field, Form } from "formik";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Button = styled.button`
  position: "absolute";
  margin-left: 430px;
  margin-top: 40px;
`;
const IngredientButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;
const InstructionButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;

const HrTagContainer = styled.div`
  margin-top: 20px;
`;

function FoodForm() {
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDriections] = useState([]);
  const history = useHistory();
  function addFoodItem(data) {
    let arr = data;
    arr.ingredients = ingredients;
    arr.directions = directions;
    axios
      .post(`http://localhost:3001/recipes`, arr)
      .then((res) => {
        history.push("/");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  function addIngredient(data) {
    let arr = ingredients;
    data.uuid = uuidv4();
    arr.push(data);
    setIngredients(() => [...arr]);
    console.log(ingredients);
  }
  function addDirection(data) {
    let arr = directions;
    if (data.option === "true") {
      data.option = "Yes";
    }
    if (data.option === "false") {
      data.option = "No";
    }
    arr.push(data);
    setDriections(() => [...arr]);
  }
  return (
    <div>
      <div>
        <Formik
          enableReinitialize
          initialValues={{}}
          onSubmit={addFoodItem}
          render={(formikProps) => (
            <Form id="foodForm">
              <div style={{ float: "left" }}>
                <label className="form-label">Name</label>
                <Field
                  name="title"
                  type="text"
                  className="text-input"
                  placeholder="Enter a name"
                  style={{ position: "absolute" }}
                />
                <br />
              </div>
              <div
                style={{ position: "absolute", marginLeft: 270, marginTop: -2 }}
              >
                <label className="form-label">Description</label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter a description"
                  className="text-input"
                />
              </div>
              <br />
              <div>
                <div
                  className="servings"
                  style={{ position: "absolute", marginTop: 19 }}
                >
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
                <div
                  style={{
                    position: "absolute",

                    marginLeft: 270,
                  }}
                >
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
                <br />
                <div style={{ marginTop: 15 }}>
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
            </Form>
          )}
        />
      </div>
      <HrTagContainer>
        <hr />
      </HrTagContainer>
      <div className="ingredient-form">
        <h4>Ingredients</h4>
        <Formik
          enableReinitialize
          initialValues={{}}
          onSubmit={addIngredient}
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
              <IngredientButton className="btn btn-secondary " type="submit">
                Submit Ingredient
              </IngredientButton>
            </Form>
          )}
        />
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              <span style={{ fontWeight: "bold" }}>Name:</span> {item.name}{" "}
              <span style={{ fontWeight: "bold" }}>Measurement:</span>{" "}
              {item.measurement}{" "}
              <span style={{ fontWeight: "bold" }}>Amount:</span> {item.amount}{" "}
            </li>
          ))}
        </ul>
      </div>
      <HrTagContainer>
        <hr />
      </HrTagContainer>

      <div className="directions-form">
        <h4>Directions</h4>
        <Formik
          enableReinitialize
          initialValues={{}}
          onSubmit={addDirection}
          render={(formikProps) => (
            <Form>
              <div>
                <label style={{ bottom: 5 }} className="form-label">
                  Instruction
                </label>
                <Field
                  name="instruction"
                  type="text"
                  rows="3"
                  maxLength="1000"
                  placeholder="Enter an instruction"
                  component="textarea"
                  className="textarea"
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <label className="form-label">Optional</label>
                <Field name="option" component="select">
                  <option value="">---Select if it is Optional ---</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Field>
              </div>

              <InstructionButton className="btn btn-secondary" type="submit">
                Add Instruction
              </InstructionButton>
            </Form>
          )}
        />
        <ul>
          {directions.map((item, index) => (
            <li>
              <span style={{ fontWeight: "bold" }}>Instruction</span>{" "}
              {item.instruction}{" "}
              <span style={{ fontWeight: "bold" }}>Optional</span> {item.option}{" "}
            </li>
          ))}
        </ul>
        <HrTagContainer>
          <hr />
        </HrTagContainer>
      </div>
      <Button className="btn btn-primary" form="foodForm" type="submit">
        Add Food{" "}
      </Button>
    </div>
  );
}

export default FoodForm;
