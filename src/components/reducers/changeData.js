import { GET_DATA, ADD_DATA } from "../actions"; //Import the actions types constant we defined in our actions
import axios from "axios";

let initialState = { allData: [] };

axios
  .get("http://localhost:3001/recipes")
  .then((res) => {
    initialState.allData = res.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
const changeData = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      let arr = initialState.allData;
      arr.push(action.payload);
      return { ...state, allData: arr };

    default:
      return state;
  }
};

export default changeData;
