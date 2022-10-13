const express = require("express");
const productRouter = express.Router();


// Koneksi ke kontroller product
const { get, filter, create, edit, drop } = require("../controller/controller_product.js");


// Routes Tabel Product
productRouter.get("/allproduct", get);              // localhost:6060/coffee/product/allproduct  => ()
productRouter.get("/filter", filter);               // localhost:6060/coffee/product/filter      => (queryparams)
productRouter.post("/", create)                     // localhost:6060/coffee/product/            => (body)
productRouter.patch("/:id_product", edit);          // localhost:6060/coffee/product/:id_product => (body,params)
productRouter.delete("/:id_product", drop)          // localhost:6060/coffee/product/:id_product => (params)




module.exports = productRouter;
