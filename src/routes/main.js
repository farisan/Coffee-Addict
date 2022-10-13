// router utama
const express = require("express");

const productRouter = require("./product.js");          // menghubungkan router utama router product
const userRouter = require("./user.js")                 // menghubungkan router utama ke router user
const promoRouter = require("./promo.js")               // menghubungkan router utama ke router promo
const transactionsRouter = require("./transactions")    // menghubungkan router utama ke router promo


const mainRouter = express.Router();


const prefix = "/coffee";                            // localhost:6060/coffee


mainRouter.use(`${prefix}/product`, productRouter);             // localhost:6060/coffee/product
mainRouter.use(`${prefix}/users`, userRouter);                   // localhost:6060/coffee/users
mainRouter.use(`${prefix}/promo`, promoRouter);                 // localhost:6060/coffee/promo
mainRouter.use(`${prefix}/transactions`, transactionsRouter);   // localhost:6060/coffee/transactions




// cek apakah benar sudah terkoneksi dan jalan (test code)
// http://ocalhost:6060/coffee
mainRouter.get("/", (req, res) => {
    res.json({
        msg: "sudah bejalan dan berhasil",
    })
})


//export
module.exports = mainRouter;