const express = require("express");
const promoRouter = express.Router();

const { get, getId, create, edit, drop } = require("../controller/controller_promo.js")


promoRouter.get("/", get);
promoRouter.get("/:name_promo", getId);
promoRouter.post("/", create);
promoRouter.patch("/:id_promo", edit);
promoRouter.delete("/:id_promo", drop);


module.exports = promoRouter;