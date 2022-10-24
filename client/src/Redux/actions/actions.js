import axios from "axios";
import {
  GET_ALL_RECIPES,
  GET_BY_ID,
  GET_TYPES,
  GET_BY_NAME,
  // FILTER_BY_SEARCHBAR,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  FILTER_BY_DIETS,
} from "./actions_reducers";

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/recipes");
      // console.log(res);
      dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error en getAllRecipe", error.message);
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/types`);
    // console.log(json.data);
    return dispatch({
      type: GET_TYPES,
      payload: json.data.map((diet) => diet.name),
    });
  };
};

export const getRecipesId = (id) => {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.error(error.message, "error en getRecipesId");
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: res.data,
      });
    } catch (error) {
      return alert("No se encontro la receta");
    }
  };
};

export const filterByDiets = (payload) => {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
};

export const orderByName = (order) => {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
};

export const orderByScore = (score) => {
  return {
    type: ORDER_BY_SCORE,
    payload: score,
  };
};

export const postRecipe = (payload) => {
  return async () => {
    try {
      let json = await axios.post("http://localhost:3001/recipe", payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};
