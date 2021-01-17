import { Formik, Field, Form } from "formik";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function FoodForm() {
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDriections] = useState([]);

  const Button = styled.button`
    position: "absolute";
    margin-left: 430px;
    margin-top: 40px;
  `;
  const IngredientButton = styled.button`
    position: "absolute";
    margin-left: 430px;
  `;
  const InstructionButton = styled.button`
    position: "absolute";
    margin-left: 430px;
  `;

  const HrTagContainer = styled.div`
    margin-top: 20px;
  `;
  const BoldText = styled.span`
    font-weight: "bold";
  `;

  function addFoodItem(data) {
    console.log(data);
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
    console.log(directions);
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
                  name="name"
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

                  <Field
                    name="serving"
                    //   type="number"
                    //   placeholder="How many servings?"
                    render={({ field, form, meta }) => (
                      <span>
                        <input
                          {...field}
                          type="number"
                          className="number-input"
                        />
                      </span>
                    )}
                  />
                </div>
                <br />
                <div
                  style={{
                    position: "absolute",
                    float: "right",
                    marginLeft: 160,
                  }}
                >
                  <label className="form-label">Prep Time (in mins)</label>
                  <Field
                    name="prepTime"
                    render={({ field, form, meta }) => (
                      <span>
                        <input
                          {...field}
                          type="number"
                          className="number-input"
                        />
                      </span>
                    )}
                  />
                </div>
                <div
                  style={{
                    marginLeft: 370,
                    marginTop: -1,
                  }}
                >
                  <label className="form-label">Cook time (in mins)</label>
                  <Field
                    name="cookTime"
                    type="number"
                    render={({ field, form, meta }) => (
                      <span>
                        <input
                          {...field}
                          type="number"
                          className="number-input"
                        />
                      </span>
                    )}
                  />
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
                  type="text"
                  placeholder="How much? Ex. 1 cup"
                  className="text-input"
                />
              </div>
              <div style={{ marginLeft: 250 }}>
                <label className="form-label">Measurement</label>
                <Field
                  name="measurement"
                  className="text-input-ingredients"
                  render={({ field, form, meta }) => (
                    <span>
                      <input
                        placeholder="Ex. teaspoon"
                        {...field}
                        type="text"
                        className="text-input"
                      />
                    </span>
                  )}
                />
              </div>
              <div style={{ postion: "absolute", marginTop: 15 }}>
                <label className="form-label">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="text-input"
                  render={({ field, form, meta }) => (
                    <span>
                      <input
                        {...field}
                        placeholder="Enter ingredient name"
                        type="text"
                        className="text-input"
                      />
                    </span>
                  )}
                />
              </div>
              <IngredientButton type="submit">Add Ingredient</IngredientButton>
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
                <label className="form-label">Option</label>
                <Field name="option" component="select">
                  <option value="">---Select if it is Optional ---</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Field>
              </div>

              <InstructionButton type="submit">
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
      <Button form="foodForm" type="submit">
        Add Food{" "}
      </Button>
    </div>
  );
}

export default FoodForm;
