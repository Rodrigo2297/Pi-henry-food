/* eslint-disable array-callback-return */
import {
  GET_ALL_RECIPES,
  GET_TYPES,
  GET_BY_ID,
  GET_BY_NAME,
  FILTER_BY_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  POST_RECIPE,
} from "../actions/actions_reducers";

const initialState = {
  allRecipes: [],
  recipes: [],
  details: [],
  dietTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        dietTypes: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case FILTER_BY_DIETS:
      const recipe = state.allRecipes;

      let filterDiets =
        action.payload === "all"
          ? recipe
            ? recipe
            : null
          : recipe.filter((r) =>
              r.dietTypes?.some((d) =>
                d.name ? d.name === action.payload : d === action.payload
              )
            );

      let array = [];

      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].vegetarian === true) {
          array.push(recipe[i]);
        }
      }

      let filterEnd = [];
      filterDiets.forEach((el) => {
        if (!array.includes(el)) {
          filterEnd.push(el);
        }
      });
      array.forEach((el) => {
        if (!filterDiets.includes(el)) {
          filterEnd.push(el);
        }
      });

      // console.log(recipe);
      return {
        ...state,
        recipes: action.paylaod === "vegetarian" ? filterEnd : filterDiets,
      };

    case ORDER_BY_NAME:
      let orderRecipe = [...state.recipes];

      orderRecipe = orderRecipe.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "asc" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "asc" ? 1 : -1;
        }
        return 0;
      });

      return {
        ...state,
        recipes: orderRecipe,
      };

    case ORDER_BY_SCORE:
      let orderScore = [...state.recipes];
      orderScore = orderScore.sort((a, b) => {
        if (a.healthScore < b.healthScore) {
          return action.payload === "mayor" ? -1 : 1;
        }
        if (a.healthScore > b.healthScore) {
          return action.payload === "mayor" ? 1 : -1;
        }
      });
      return {
        ...state,
        recipes: orderScore,
      };

    case POST_RECIPE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
