import produce from "immer";
import {
  GET_RECIPES_SUCCESS,
  GET_CURRENT_RECIPE_SUCCESS,
  UPDATE_INGREDIENT,
  POST_INGREDIENT,
  UPDATE_DIRECTION,
  ADD_DIRECTION,
  UPDATE_RECIPE,
  ADD_RECIPE,
} from "../actions/recipes";

const initialState = {
  recipesList: [],
  currentRecipe: { ingredients: [], directions: [] },
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

      case UPDATE_RECIPE:
        const recipeIndex = draft.recipesList.findIndex(
          (recipe) => recipe.uuid === action.recipe.uuid
        );
        draft.recipesList[recipeIndex] = action.recipe;
        draft.currentRecipe = action.recipe;
        break;

      case UPDATE_INGREDIENT:
        const ingredientIndex = draft.currentRecipe.ingredients.findIndex(
          (ingredient) => ingredient.uuid === action.ingredient.uuid
        );

        draft.currentRecipe.ingredients[ingredientIndex] = action.ingredient;
        break;

      case POST_INGREDIENT:
        draft.currentRecipe.ingredients.push(action.ingredient);

        break;

      case UPDATE_DIRECTION:
        const directionIndex = action.directionIndex;
        console.log("my index", directionIndex);
        draft.currentRecipe.directions[directionIndex] = action.direction;
        break;

      case ADD_DIRECTION:
        draft.currentRecipe.directions.push(action.direction);

        break;

      case ADD_RECIPE:
        draft.recipesList.push(action.recipe);

        break;
      default:
        return draft;
    }
  });
};

export default recipesReducer;
