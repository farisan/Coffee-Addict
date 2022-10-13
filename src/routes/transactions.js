const express = require("express");
const transactionsRouter = express.Router();

// Koneksi ke controller transactions
const { get, getId, create, edit, drop } = require("../controller/controller_transactions.js")


// Routes Table Transactions
transactionsRouter.get("/", get);                       // localhost:6060/coffee/transactions/                  => ()
transactionsRouter.get("/:id_transaction", getId);      // localhost:6060/coffee/transactions/:id_transactions  => (params)
transactionsRouter.post("/", create);                   // localhost:6060/coffee/transactions/                  => (body)
transactionsRouter.patch("/:id_transaction", edit);     // localhost:6060/coffee/transactions/:id_transactions  => (body, params)
transactionsRouter.delete("/:id_transaction", drop);    // localhost:6060/coffee/transactions/:id_transactions  => (params)


module.exports = transactionsRouter;