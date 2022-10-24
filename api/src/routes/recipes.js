const { Router } = require("express");
const { getAllRecipes } = require("../controller/getRecipe");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;

    let allRecipes = await getAllRecipes();

    if (name) {
      let recipeByName = await allRecipes.filter((res) =>
        res.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeByName.length
        ? res.status(200).send(recipeByName)
        : res.status(400).send("No esta la receta");
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    return res.status(404).send("error en recipes.js");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  let allRecipe = await getAllRecipes();
  if (id) {
    let idRecipe = await allRecipe.filter((el) => el.id == id);

    idRecipe.length
      ? res.status(200).json(idRecipe)
      : res.status(400).send("Receta no encontrada");
  }
});

module.exports = router;
