// const { response } = require("express");
// const { text } = require("express");

// Menghubungan Product repo ke controller product
const repoProduct = require("../repo/repo_product.js");


/* ============================================================= */

// Get data || menampilkan data yang ada di database
const get = async (req, res) => {
    try {
        const response = await repoProduct.getProduct();
        res.status(200).json({
            result: response.rows,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
}


const filter = async (req, res) => {
    try {
        console.log(req.query);
        const response = await repoProduct.filterProduct(req.query)
        res.status(200).json({
            result: response.rows,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const create = async (req, res) => {
    try {
        const response = await repoProduct.createProduct(req.body)
        res.status(200).json({
            msg: "Create Data Success",
            data: response.text = req.body,
        });

    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const edit = async (req, res) => {
    try {
        const response = await repoProduct.editProduct(req.body, req.params)
        res.status(200).json({
            // result: response,
            msg: "Edit Data Success",
            data: response.text = req.body
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const drop = async (req, res) => {
    try {
        const response = await repoProduct.deleteProduct(req.params)
        res.status(200).json({
            // result: response,
            msg: "Delete Data Success"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}




const productController = {
    get,
    filter,
    create,
    edit,
    drop

}

module.exports = productController;