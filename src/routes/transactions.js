const express = require("express");
const transactionsRouter = express.Router();

const { get, getId, create, edit, drop } = require("../controller/controller_transactions.js")

transactionsRouter.get("/", get);
transactionsRouter.get("/:id_transaction", getId);
transactionsRouter.post("/", create);
transactionsRouter.patch("/:id_transaction", edit);
transactionsRouter.delete("/:id_transaction", drop);


module.exports = transactionsRouter;