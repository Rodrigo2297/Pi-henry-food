require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getApiInfoById = async () => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
};

const getDbInfoById = async () => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getApiInfoById,
  getDbInfoById,
};
