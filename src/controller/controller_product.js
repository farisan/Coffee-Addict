// const { response } = require("express");
const { text } = require("express");
const productRepo = require("../repo/repo_product.js");




// Get data || menampilkan data yang ada di database
const get = async (req, res) => {
    try {
        const response = await productRepo.getProduct();
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
        const response = await productRepo.filterProduct(req.query)
        res.status(200).json({
            result: response.rows,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const getSearch = async (req, res) => {
    try {
        console.log(req.query);
        const response = await productRepo.getSearch(req.query)
        res.status(200).json({
            result: response.rows,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}



const getCategory = async (req, res) => {
    try {
        console.log(req.params);
        const response = await productRepo.getCategory(req.params)
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
        const response = await productRepo.createProduct(req.body)
        res.status(200).json({
            msg: "Data berhasil di tambahkan",
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
        const response = await productRepo.editProduct(req.body, req.params)
        res.status(200).json({
            result: response,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const drop = async (req, res) => {
    try {
        const response = await productRepo.deleteProduct(req.params)
        res.status(200).json({
            result: response,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const productController = {
    get,
    getSearch,
    getCategory,
    create,
    edit,
    drop,
    filter
    // search
}

module.exports = productController;