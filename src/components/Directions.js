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
  updateDirection,
  saveCurrentRecipe,
  addDirection,
} from "../actions/recipes";

const CloseModalButton = styled.button`
  position: "absolute";
  left: 4px;
  top: 4px;
`;
const DirectionButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;
const Label = styled.span`
  font-weight: 700;
  margin-left: 5px;
`;
const LabelText = styled.span`
  margin-left: 5px;
`;
const EditButton = styled.button`
  margin-left: 5px;
`;
const FormContainer = styled.div`
  margin-left: 30px;
  padding-bottom: 30px;
`;

function Directions(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState({});
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useState(0);
  const [foodItem, setFoodItem] = useState({});
  const directions = useSelector(
    (state) => state.recipes.currentRecipe.directions
  );

  //get recipe from parameter
  const { recipeId } = useParams();
  useEffect(() => {
    dispatch(getCurrentRecipe(recipeId));
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
  function navigateToHomePage() {
    history.push("/");
  }
  //change oprion to strings
  function changeOptionToString(item) {
    if (item === true || item === "true") {
      return "yes";
    } else {
      return "no";
    }
  }
  //set selected direction to edit to state
  function openModal(direction, directionIndex) {
    setIsOpen(true);
    setSelectedDirection(direction);
    setSelectedDirectionIndex(directionIndex);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //edit direction from modal
  function handleSubmit(form) {
    const newDirection = {
      instructions: form.instructions,
      optional: form.optional,
    };
    console.log(newDirection);
    console.log(selectedDirection);
    dispatch(updateDirection(newDirection, selectedDirectionIndex));
    dispatch(saveCurrentRecipe());
    closeModal();
  }
  //add a direction
  function submitDirection(form) {
    const newDirection = {
      uuid: uuidv4(),
      instructions: form.values.instructions,
      optional: form.values.optional,
    };
    dispatch(addDirection(newDirection));
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
          <h4>Direction</h4>
          <Formik
            enableReinitialize
            initialValues={{
              instructions: selectedDirection.instructions,
              optional: selectedDirection.optional,
            }}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <div>
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
                </div>
                <div className="small-margin-top">
                  <label className="form-label">Optional</label>
                  <Field name="optional" component="select">
                    <option value="">---Select if it is Optional ---</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Field>
                </div>

                <DirectionButton className="btn btn-secondary" type="submit">
                  Add Instruction
                </DirectionButton>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <button onClick={navigateToHomePage} className="btn btn-secondary">
        Back
      </button>
      <div className="directions-container">
        <h1 className="directions-header">Directions</h1>
        <div className="small-margin-top">
          <ul>
            {directions.map((item, index) => (
              <li className="small-margin-top" key={index}>
                <Label>Instruction:</Label>
                <LabelText>{item.instructions} </LabelText>
                <Label>Optional:</Label>
                <LabelText>{changeOptionToString(item.optional)}</LabelText>
                <EditButton
                  type="button"
                  onClick={() => openModal(item, index)}
                >
                  Edit
                </EditButton>
              </li>
            ))}
          </ul>
          <FormContainer>
            <Formik
              enableReinitialize
              initialValues={{}}
              onSubmit={submitDirection}
            >
              {(formikProps) => (
                <Form>
                  <div style={{ position: "absolute", float: "left" }}>
                    <label className="form-label">Instruction</label>
                    <Field
                      name="instructions"
                      type="text"
                      placeholder="Enter an instruction?"
                      className="text-input"
                    />
                  </div>
                  <div style={{ marginLeft: 270 }}>
                    <label className="form-label">Optional</label>
                    <Field name="optional" component="select">
                      <option value="">---Select if it is Optional ---</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                  </div>

                  <button
                    type="button"
                    style={{ marginTop: 15, marginLeft: 20 }}
                    className="btn btn-warning"
                    onClick={() => submitDirection(formikProps)}
                  >
                    Add a Direction
                  </button>
                </Form>
              )}
            </Formik>
          </FormContainer>
        </div>
      </div>
    </div>
  );
}

export default Directions;
