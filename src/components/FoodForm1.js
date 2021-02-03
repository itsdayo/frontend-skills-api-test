import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { postNewRecipe } from "../actions/recipes";
import moment from "moment";

const Button = styled.button`
  position: "absolute";
  margin-left: 430px;
  margin-top: 45px;
`;
const IngredientButton = styled.button`
  position: "absolute";
  margin-left: 370px;
  margin-top: 60px;
`;
const InstructionButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;

const Name = styled.div`
  float: left;
`;
const Description = styled.div`
  float: right;
  margin-right: 50px;
`;
const Servings = styled.div`
  float: left;
  margin-top: 25px;
  margin-left: -47px;
`;
const PrepTime = styled.div`
  float: left;
  margin-left: 75px;
`;
const CookTime = styled.div`
  float: right;
  margin-top: -26px;
  margin-right: 25px;
`;
const Amount = styled.div`
  float: left;
`;
const Measurement = styled.div`
  float: right;
  margin-right: 50px;
`;
const IngredientName = styled.div`
  position: absolute;
  margin-top: 15px;
`;
const Instruction = styled.div``;
const Optional = styled.div``;
const HrTagContainer = styled.div`
  margin-top: 20px;
`;
const PrepAndCookContainer = styled.div``;

const ServingsPrepAndCookContainer = styled.div``;

function FoodForm() {
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDriections] = useState([]);
  const dispatch = useDispatch();

  //form for submitting a new recipe
  function addFoodItem(form) {
    const date = moment().format("L");
    const time = moment().format("LTS");
    const dateAndTime = date + " " + time;

    const newRecipe = {
      uuid: uuidv4(),
      title: form.title,
      description: form.description,
      servings: form.servings,
      prepTime: form.prepTime,
      ingredients: ingredients,
      directions: directions,
      postDate: dateAndTime,
    };

    dispatch(postNewRecipe(newRecipe));
  }

  //create ingredients for recipe
  function addIngredient(data) {
    let arr = ingredients;
    data.uuid = uuidv4();
    arr.push(data);
    setIngredients(() => [...arr]);
  }
  //create directions for recipes
  function addDirection(data) {
    let arr = directions;
    if (data.option === "true") {
      data.option = "yes";
    }
    if (data.option === "false") {
      data.option = "no";
    }
    arr.push(data);
    setDriections(() => [...arr]);
  }

  //change option from true and false to yes and no
  function changeOption(item) {
    if (item === "true") {
      return "yes";
    }
    if (item === "false") {
      return "no";
    }
  }

  return (
    <div>
      <div>
        <Formik enableReinitialize initialValues={{}} onSubmit={addFoodItem}>
          {(formikProps) => (
            <Form id="foodForm">
              <div>
                <Name>
                  <label className="form-label">Name</label>
                  <Field
                    name="title"
                    type="text"
                    className="text-input"
                    placeholder="Enter a name"
                    style={{ position: "absolute" }}
                  />
                  <br />
                </Name>

                <Description>
                  <label className="form-label">Description</label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Enter a description"
                    className="text-input"
                  />
                </Description>
              </div>
              <br />
              <div>
                <ServingsPrepAndCookContainer>
                  <Servings>
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
                  </Servings>
                  <br />
                  <PrepAndCookContainer>
                    <PrepTime>
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
                    </PrepTime>
                    <br />
                    <CookTime>
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
                    </CookTime>
                  </PrepAndCookContainer>
                </ServingsPrepAndCookContainer>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <HrTagContainer>
        <hr />
      </HrTagContainer>
      <div className="modal-form">
        <h4>Ingredients</h4>
        <Formik enableReinitialize initialValues={{}} onSubmit={addIngredient}>
          {(formikProps) => (
            <Form>
              <Amount>
                <label className="form-label">Amount</label>
                <Field
                  name="amount"
                  type="number"
                  step={0.1}
                  placeholder="How much?"
                  className="text-input"
                />
              </Amount>
              <Measurement>
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
              </Measurement>

              <br />
              <IngredientName>
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
              </IngredientName>
              <IngredientButton className="btn btn-secondary " type="submit">
                Submit Ingredient
              </IngredientButton>
            </Form>
          )}
        </Formik>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              <span className="bold-text">Name:</span> {item.name}{" "}
              <span className="bold-text">Measurement:</span> {item.measurement}{" "}
              <span className="bold-text">Amount:</span> {item.amount}{" "}
            </li>
          ))}
        </ul>
      </div>
      <HrTagContainer>
        <hr />
      </HrTagContainer>

      <div className="modal-form">
        <h4>Directions</h4>
        <Formik enableReinitialize initialValues={{}} onSubmit={addDirection}>
          {(formikProps) => (
            <Form>
              <Instruction>
                <label className="form-label">Instruction</label>
                <Field
                  name="instructions"
                  type="text"
                  rows="3"
                  maxLength="1000"
                  placeholder="Enter an instruction"
                  component="textarea"
                  className="textarea"
                />
              </Instruction>
              <Optional>
                <label className="form-label">Optional</label>
                <Field name="optional" component="select">
                  <option value="">---Select if it is Optional ---</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Field>
              </Optional>

              <InstructionButton className="btn btn-secondary" type="submit">
                Add Instruction
              </InstructionButton>
            </Form>
          )}
        </Formik>
        <ul>
          {directions.map((item, index) => (
            <li>
              <span className="bold-text">Instruction</span> {item.instructions}{" "}
              <span className="bold-text">Optional</span>{" "}
              {changeOption(item.optional)}{" "}
            </li>
          ))}
        </ul>
        <HrTagContainer>
          <hr />
        </HrTagContainer>
      </div>
      <Button className="" form="foodForm" type="submit">
        Add Food{" "}
      </Button>
    </div>
  );
}

export default FoodForm;
