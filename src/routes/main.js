// router utama

const express = require("express");

const productRouter = require("./product.js"); // menghubungkan router utama router product
const userRouter = require("./user.js") // menghubungkan router utama ke router user
const voucherRouter = require("./promo.js") // menghubungkan router utama ke router promo
const transactionsRouter = require("./transactions") // menghubungkan router utama ke router voucher

const mainRouter = express.Router();




// localhost:6060/coffee/v1
const prefix = "/coffee/v1";


// menyambungkan main router ke sub router
mainRouter.use(`${prefix}/product`, productRouter);
mainRouter.use(`${prefix}/user`, userRouter);
mainRouter.use(`${prefix}/voucher`, voucherRouter);
mainRouter.use(`${prefix}/transactions`, transactionsRouter);















// cek apakah benar sudah terkoneksi dan jalan (test code)
// http://localhost:6060/
mainRouter.get("/", (req, res) => {
    res.json({
        msg: "sudah bejalan dan berhasil",
    })
})


//export
module.exports = mainRouter;