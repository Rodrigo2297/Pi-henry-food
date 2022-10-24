const { Router } = require("express");
const { Recipe, Diet } = require("../db.js");
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, summary, score, healthScore, steps, dietTypes, image } =
      req.body;
    const patron = new RegExp("^[ñíóáéú a-zA-Z ]+$");
    const errors = {};
    if (!patron.test(name)) {
      errors.name = "The name cannot contain numbers";
    }

    if (score < 1 || score > 100) {
      errors.score = "The score must be a number between 1 and 100";
    }

    if (errors.name || errors.score) {
      res.status(400).send(errors);
    }

    const newRecipe = await Recipe.create({
      name,
      summary,
      score,
      healthScore,
      steps,
      image,
    });

    let dietTypesRecipeDb = await Diet.findAll({
      where: { name: dietTypes },
    });

    newRecipe.addDiet(dietTypesRecipeDb);

    res.send(newRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
