import React from "react";
import "./style.css";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "./components/state/store";
const Button = styled.button`
  margin-top: 10px;
  margin-left: 5px;
`;
function Root() {
  function test(arr) {
    console.log(arr);
  }
  return (
    <Provider store={store}>
      <React.Fragment>
        <Button className="btn btn-info">View the specials </Button>
        <br />
        <div style={{ marginTop: 5 }}>
          <div className="food-list">
            <div className="food-list-content">
              <FoodList test={test} />
            </div>
          </div>
          <div className="food-form">
            <div className="food-form-content">
              <FoodForm />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Provider>
  );
}

export default Root;
