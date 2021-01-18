import "./../style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
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
function FoodList(props) {
  const history = useHistory();
  const reduxState = useSelector((state) => state.changeData);
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [foodItem, setFoodItem] = useState({});
  const [formList, setFormList] = useState([]);

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

    let changedFoodItem = foodItem;
    changedFoodItem.cookTime = item.cookTime;
    changedFoodItem.description = item.description;
    changedFoodItem.prepTime = item.prepTime;
    changedFoodItem.servings = item.servings;
    changedFoodItem.title = item.title;
    changedFoodItem.editDate = dateTime;

    axios
      .put(`http://localhost:3001/recipes/${foodItem.uuid}`, changedFoodItem)
      .then()
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    window.location.reload();
  }
  function viewDescription(foodItem) {
    history.push({
      pathname: "/directions",
      state: { foodItem: foodItem },
    });
  }
  function viewIngredients(foodItem) {
    history.push({
      pathname: "/ingredients",
      state: { foodItem: foodItem },
    });
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
                  style={{
                    position: "absolute",
                    marginLeft: 270,
                    marginTop: -2,
                  }}
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
                      float: "right",
                      marginLeft: 160,
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
                  <div
                    style={{
                      marginLeft: 380,
                      marginTop: -1,
                    }}
                  >
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

                <SubmitEditButton className="btn btn-primary" type="submit">
                  Add Instruction
                </SubmitEditButton>
              </Form>
            )}
          />
        </div>
      </Modal>
      {allData.map((item, index) => (
        <div key={index} className="food-card">
          <div className="food-card-content">
            {item.images != undefined ? (
              <img
                className="food-list-image"
                src={item.images.small}
                alt="Sorry something went wrong"
                height={100}
                width={150}
              />
            ) : (
              <img
                className="food-list-image"
                src="https://images.squarespace-cdn.com/content/v1/55ece940e4b048d1ed401c11/1450136257542-4DATU4KRB70MDENGJXJX/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwkCFOLgzJj4yIx-vIIEbyWWRd0QUGL6lY_wBICnBy59Ye9GKQq6_hlXZJyaybXpCc/X%3A++The+Unknown"
                // alt="Sorry something went wrong"
                height={100}
                width={150}
              />
            )}
            <div className="food-list-description">
              <div className="food-card-text">
                <span style={{ fontWeight: "bold" }}>Name:</span> {item.title}{" "}
              </div>
              <div className="food-card-text">
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                {item.description}
              </div>
              <div className="food-card-text">
                <span style={{ fontWeight: "bold" }}>Serving:</span>{" "}
                {item.servings}
                <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Prep Time:
                </span>
                <span style={{ marginLeft: 2 }}> {item.prepTime} </span>
                <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Cook time:
                </span>{" "}
                {item.cookTime}
              </div>
              <div className="food-card-text">
                <span style={{ fontWeight: "bold" }}>Posted on:</span>{" "}
                {item.postDate}
              </div>
              <div className="food-card-text">
                <span style={{ fontWeight: "bold" }}>Edited on:</span>
                <span style={{ marginLeft: 3 }}>{item.editDate}</span>
              </div>
            </div>
          </div>
          <div className="food-card-buttons">
            <button
              style={{}}
              className="btn btn-success"
              onClick={() => openModal(item)}
            >
              Edit{" "}
            </button>
            <button
              style={{ marginLeft: 10 }}
              className=" btn btn-warning"
              onClick={() => viewDescription(item)}
            >
              View Directions
            </button>
            <button
              style={{ marginLeft: 10, position: "absolute", float: "left" }}
              className="btn btn-dark"
              onClick={() => viewIngredients(item)}
            >
              {" "}
              View Ingredients
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
