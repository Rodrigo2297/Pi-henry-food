const { Router } = require("express");

const { getAllRecipes } = require("../controller/getRecipe");

const router = Router();

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  let nExcluidos = await RecipeDetails.destroy({
    where: { id: id },
  });

  res.json({
    nExcluidos: nExcluidos,
  });
});

module.exports = router;
