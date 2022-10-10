const express = require("express");
const usersRouter = express.Router();


const { get, getId, create, edit, drop } = require("../controller/controller_user");

// localhost:6060/coffee/v1/user/           <= (menampilkan isi tabel user dalam database)
usersRouter.get("/", get);
usersRouter.get("/:id_users", getId);
usersRouter.post("/", create);      // <= (route input data kedalam database menggunakan method post)
usersRouter.patch("/:id_users", edit); // <= (route untuk edit data berdasarkan id user)
usersRouter.delete("/:id_users", drop) // <= (route untuk menghapus data berdasarkan id user)



module.exports = usersRouter;