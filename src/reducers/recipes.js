import produce from "immer";
import {
  GET_RECIPES_SUCCESS,
  POST_RECIPES_SUCCESS,
  GET_CURRENT_RECIPE_SUCCESS,
  UPDATE_INGREDIENT,
} from "../actions/recipes";

const initialState = {
  recipesList: [],
  currentRecipe: { ingredients: [] },
};

const recipesReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_RECIPES_SUCCESS:
        draft.recipesList = action.recipes;
        draft.loading = false;
        break;

      case GET_CURRENT_RECIPE_SUCCESS:
        draft.currentRecipe = action.recipe;
        draft.loading = false;
        break;

      case UPDATE_INGREDIENT:
        const ingredientIndex = draft.currentRecipe.ingredients.findIndex(
          (ingredient) => ingredient.uuid === action.ingredient.uuid
        );

        draft.currentRecipe.ingredients[ingredientIndex] = action.ingredient;
        break;

      case POST_RECIPES_SUCCESS:
        let arr = action;

        draft.recipesList = action.recipes;
        draft.loading = false;
        break;
    }
  });
};

export default recipesReducer;
