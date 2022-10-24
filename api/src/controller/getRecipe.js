require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { results } = require("../apiData/api");

const getApiInfo = async () => {
  // let url = api;

  const resp = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
    .then((res) => res.data.results);

  // const { results } = apiUrl.data;

  let apiInfo = await resp?.map((el) => {
    return {
      id: el.id, //----
      image: el.image,
      name: el.title, //----
      dietTypes: el.diets, //----
      summary: el.summary.replace(/<[^>]*>?/g, ""),
      score: el.spoonacularScore,
      healthScore: el.healthScore, //----
      dishTypes: el.dishTypes,
      steps: el.analyzedInstructions[0]?.steps.map((s) => {
        //----
        return {
          number: s.number,
          step: s.step,
        };
      }),
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

const getDbInfo = async () => {
  try {
    const infoDataB = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    let dbInfo = await infoDataB?.map((res) => {
      return {
        id: res.id,
        name: res.name,
        summary: res.summary,
        healthScore: res.healthScore,
        steps: res.steps,
        image: res.image,
        score: res.score,
        dietTypes: res.diets ? res.diets : res.diets.map((x) => x.name),
      };
    });

    return dbInfo;
  } catch (error) {
    console, error(error);
  }
};

const getAllRecipes = async () => {
  try {
    const apiInfo = await getApiInfo();
    const bdInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(bdInfo);

    return totalInfo;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
};
