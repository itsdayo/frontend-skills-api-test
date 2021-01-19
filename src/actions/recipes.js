import axios from "axios";

export const GET_RECIPES_SUCCESS = "GET_RECIPES_SUCCESS";
export const ADD_RECIPE = "ADD_RECIPE";

export const SAVE_CURRENT_RECIPE_SUCCESS = "SAVE_CURRENT_RECIPE_SUCCESS";
export const GET_CURRENT_RECIPE_SUCCESS = "GET_CURRENT_RECIPE_SUCCESS";

export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const UPDATE_INGREDIENT_SUCCESS = "UPDATE_INGREDIENT_SUCCESS";
export const POST_INGREDIENT = "POST_INGREDIENT";
export const UPDATE_DIRECTION = "UPDATE_DIRECTION";

export const ADD_DIRECTION = "ADD_DIRECTION";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

//get all recipes
export function getRecipes() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/recipes").then(({ data }) => {
      dispatch(getRecipesSuccess(data));
    });
  };
}

//get the current recipe by ID
export function getCurrentRecipe(recipeId) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes/${recipeId}`)
      .then(({ data }) => {
        dispatch(getCurrentRecipeSuccess(data));
      });
  };
}

export function updateRecipe(recipe) {
  return {
    type: UPDATE_RECIPE,
    recipe,
  };
}

export function saveCurrentRecipe() {
  return function (dispatch, getState) {
    const recipe = getState().recipes.currentRecipe;
    return axios
      .put(`http://localhost:3001/recipes/${recipe.uuid}`, recipe)
      .then(({ data }) => dispatch(saveCurrentRecipeSuccess(data)));
  };
}

export function postNewRecipe(newRecipe) {
  return function (dispatch) {
    dispatch(addRecipe(newRecipe));
    return axios
      .post(`http://localhost:3001/recipes`, newRecipe)
      .then(({ data }) => dispatch(saveCurrentRecipeSuccess(data)));
  };
}

export function updateIngredient(ingredient) {
  return {
    type: UPDATE_INGREDIENT,
    ingredient,
  };
}
export function updateDirection(direction, directionIndex) {
  return {
    type: UPDATE_DIRECTION,
    direction,
    directionIndex,
  };
}
export function postIngredient(ingredient) {
  return {
    type: POST_INGREDIENT,
    ingredient,
  };
}
export function addDirection(direction) {
  return {
    type: ADD_DIRECTION,
    direction,
  };
}

export function addRecipe(recipe) {
  return {
    type: ADD_RECIPE,
    recipe,
  };
}

function getRecipesSuccess(recipes) {
  return {
    type: GET_RECIPES_SUCCESS,
    recipes,
  };
}

export function getCurrentRecipeSuccess(recipe) {
  return {
    type: GET_CURRENT_RECIPE_SUCCESS,
    recipe,
  };
}

export function saveCurrentRecipeSuccess(recipe) {
  return {
    type: SAVE_CURRENT_RECIPE_SUCCESS,
    recipe,
  };
}
