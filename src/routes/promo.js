const express = require("express");
const promoRouter = express.Router();

// koneksi ke controller promo
const { get, getId, create, edit, drop } = require("../controller/controller_promo.js")


// Routes Tabel Promo
promoRouter.get("/", get);                  // localhost:6060/coffee/promo/             => ()
promoRouter.get("/:name_promo", getId);     // localhost:6060/coffee/promo/:name_promo  => (params)
promoRouter.post("/", create);              // localhost:6060/coffee/promo/             => (body)
promoRouter.patch("/:id_promo", edit);      // localhost:6060/coffee/promo/:id_promo    => (body,params)
promoRouter.delete("/:id_promo", drop);     // localhost:6060/coffee/promo/:id_promo    => (params)


module.exports = promoRouter;