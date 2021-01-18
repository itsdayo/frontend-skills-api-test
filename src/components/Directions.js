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
const DirectionButton = styled.button`
  position: "absolute";
  margin-left: 400px;
`;
function Directions(props) {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allDirections, setAllDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState({});
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
    console.log(props.location.state.foodItem.directions);
    let directions = props.location.state.foodItem.directions;
    // for (let i = 0; i <= directions; i++) {
    //   if (directions.optional === true) {
    //     directions.optional = "yes";
    //     console.log(true);
    //   } else if (directions.optional === false) {
    //     directions.optional = "no";
    //     console.log(false);
    //   } else {
    //     console.log(i);
    //   }
    // }
    console.log(directions);
    setAllDirections(directions);
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
  function navigateToHomePage() {
    history.push("/");
  }
  function changeOptionToString(item) {
    console.log(item);
    if (item === true || item === "true") {
      return "yes";
    } else {
      return "no";
    }
  }
  function openModal(foodItem, direction) {
    setIsOpen(true);

    setSelectedDirection(direction);
    setSelectedFoodItem(foodItem);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleSubmit(item) {
    item.uuid = uuidv4();

    let foodItem = selectedFoodItem;
    let directions = selectedFoodItem.directions;

    for (let i = 0; i <= directions.length - 1; i++) {
      if (directions[i].uuid === selectedDirection.uuid) {
        directions[i] = item;
        break;
      }
    }
    foodItem.directions = directions;
    axios
      .put(`http://localhost:3001/recipes/${foodItem.uuid}`, foodItem)
      .then(() => closeModal());
    setAllDirections(() => [...foodItem.directions]);
    setFoodItem(foodItem);
  }

  function addDirection(item) {
    let newDirection = item;
    newDirection.uuid = uuidv4();
    let arr = allData;

    let changedFoodItem = {};

    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i].uuid === props.location.state.foodItem.uuid) {
        arr[i].directions.push(newDirection);
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
      .then(() => setAllDirections(() => [...changedFoodItem.directions]))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setFoodItem(changedFoodItem);
  }
  console.log(allDirections);
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
            render={(formikProps) => (
              <Form>
                <div>
                  <label style={{ bottom: 5 }} className="form-label">
                    Instruction
                  </label>
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
                <div style={{ marginTop: 15 }}>
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
          />
        </div>
      </Modal>
      <button onClick={navigateToHomePage} className="btn btn-secondary">
        Back
      </button>
      <div className="directions-container">
        <h1 className="directions-header">Directions</h1>
        <div style={{ marginTop: 15 }}>
          <ul>
            {allDirections.map((item, index) => (
              <li style={{ marginTop: 15 }} key={index}>
                <span style={{ fontWeight: "bold" }}>Instruction:</span>
                <span style={{ marginLeft: 5 }}>{item.instructions} </span>
                <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Optional:
                </span>
                <span style={{ marginLeft: 5 }}>
                  {changeOptionToString(item.optional)}
                </span>
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
              onSubmit={addDirection}
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
                    type="submit"
                    style={{ marginTop: 15, marginLeft: 20 }}
                    className="btn btn-warning"
                  >
                    Add a Direction
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Directions;
