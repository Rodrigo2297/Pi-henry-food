const { Router } = require("express");
const router = Router();
const { Diet } = require("../db");

const dietTypesDb = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "lacto ovo vegetarian",
  "vegan",
  "pescetarian",
  "paleolithic",
  "primal",
  "fodmap friendly",
  "whole 30",
  "dairy free",
];

router.get("/", async (req, res, next) => {
  try {
    dietTypesDb.forEach((x) => {
      Diet.findOrCreate({
        where: {
          name: x,
        },
      });
    });

    let dietTypes = await Diet.findAll();

    res.send(dietTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
