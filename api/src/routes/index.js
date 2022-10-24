const { Router } = require("express");

const recipes = require("./recipes");
const addRecipe = require("./postRecipe");
const types = require("./diets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes);
router.use("/recipe", addRecipe);
router.use("/types", types);

module.exports = router;
