import "./../style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function FoodList(props) {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    // retrieving data from the recipe  api
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => {
        setAllData(res.data);
        console.log(res.data);
        console.log(props);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  function editItem() {
    history.push("/ingredients");
  }
  function viewDescription() {}
  function viewIngredients() {}
  return (
    <div>
      {allData.map((item, index) => (
        <div key={index} className="food-card">
          <div className="food-card-content">
            <img
              className="food-list-image"
              src={item.images.small}
              alt="Sorry something went wrong"
              height={100}
              width={150}
            />{" "}
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
            <button onClick={editItem}>Edit </button>
            <button onClick={viewDescription}>View Directions</button>
            <button onClick={viewIngredients}> View Ingredients</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
