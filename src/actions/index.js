const recipesActions = require("./recipes");
// const ingredientActions = require("./ingredients");
// import ingredientActions from './ingredi'
const specialsAction = require("./specials");
module.exports = {
  ...recipesActions,
  ...specialsAction,
  // ...ingredientActions,
};
