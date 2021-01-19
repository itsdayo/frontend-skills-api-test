import React from "react";
import "./style.css";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Button = styled.button`
  margin-top: 10px;
  margin-left: 5px;
`;

function App() {
  const history = useHistory();
  function navigateToSpecialsPage() {
    history.push("/specials");
  }
  return (
    <React.Fragment>
      <Button onClick={navigateToSpecialsPage} className="btn btn-info">
        View the specials{" "}
      </Button>
      <br />
      <div style={{ marginTop: 5 }}>
        <div className="food-list">
          <div className="food-list-content">
            <FoodList />
          </div>
        </div>
        <div className="food-form">
          <div className="food-form-content">
            <FoodForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
