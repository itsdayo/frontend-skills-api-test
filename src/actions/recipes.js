import axios from "axios";

export const GET_RECIPES_SUCCESS = "GET_RECIPES_SUCCESS";
export const POST_RECIPES_SUCCESS = "POST_RECIPES_SUCCESS";
export const GET_CURRENT_RECIPE_SUCCESS = "GET_CURRENT_RECIPE_SUCCESS";

export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const UPDATE_INGREDIENT_SUCCESS = "UPDATE_INGREDIENT_SUCCESS";

export function getRecipes() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/recipes").then(({ data }) => {
      dispatch(getRecipesSuccess(data));
    });
  };
}

export function getCurrentRecipe(recipeId) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes/${recipeId}`)
      .then(({ data }) => {
        dispatch(getCurrentRecipeSuccess(data));
      });
  };
}

export function updateRecipes(data) {
  return function (dispatch) {
    return axios
      .put(`http://localhost:3001/recipes/${data.uuid}`, data)
      .then(getRecipesSuccess(data));
  };
}

export function saveRecipe(recipe) {
  return function (dispatch, getState) {
    console.log("moon", getState());
    return axios
      .put(
        `http://localhost:3001/recipes/${recipe.uuid}`,
        getState().recipes.currentRecipe
      )
      .then(({ data }) => dispatch(getCurrentRecipeSuccess(data)));
  };
}

export function updateIngredient(ingredient) {
  return {
    type: UPDATE_INGREDIENT,
    ingredient,
  };
}

export function postRecipes(data) {
  return function (dispatch) {
    return axios.post(`http://localhost:3001/recipes/`, data);
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
