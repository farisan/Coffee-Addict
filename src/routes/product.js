const express = require("express");
const productRouter = express.Router();

// tambahkan search 
const { get, getSearch, filter, getCategory, create, edit, drop } = require("../controller/controller_product.js");



// localhost:6060/coffee/v1/product/
productRouter.get("/allproduct", get);
productRouter.get("/search", getSearch); // queryparams
productRouter.get("/filter", filter); // queryparams
productRouter.get("/:category", getCategory);   //params
productRouter.post("/", create) // body, params
productRouter.patch("/:id_product", edit);
productRouter.delete("/:id_product", drop)




module.exports = productRouter;
