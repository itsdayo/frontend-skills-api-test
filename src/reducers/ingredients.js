//let initialState = { foodItem: {}, ingredients: [] };
// import produce from "immer";
// import { GET_INGREDIENTS_SUCCESS } from "../actions/ingredients";
// const initialState = {
//   ingredientsList: [],
//   recipes: [],
//   loading: false,
// };
// // const ingredients = (state = initialState, action) => {
// //   switch (action.type) {
// //     case "STORE_INGREDIENTS":
// //       return { ...state, foodItem: initialState.foodItem.ingredients };

// //     default:
// //       return state;
// //   }
// // };

// const ingredientsReducer = (state = initialState, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case GET_INGREDIENTS_SUCCESS:
//         draft.ingredientsList = action.ingredients;
//         draft.recipes = action.recipesArr;
//         draft.loading = false;

//         break;
//     }
//   });
// };
// export default ingredientsReducer;
