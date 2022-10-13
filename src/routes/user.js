const express = require("express");
const usersRouter = express.Router();

// Koneksi ke controller user
const { get, getId, create, edit, drop } = require("../controller/controller_user");


// Routes Tabel Users
usersRouter.get("/", get);              // localhost:6060/coffee/users/             => ()
usersRouter.get("/:id_users", getId);   // localhost:6060/coffee/users/:id_users    => (params)
usersRouter.post("/", create);          // localhost:6060/coffee/users/             => (params)
usersRouter.patch("/:id_users", edit);  // localhost:6060/coffee/users/:id_users    => (body,params)
usersRouter.delete("/:id_users", drop)  // localhost:6060/coffee/users/:id_users    => (params)



module.exports = usersRouter;