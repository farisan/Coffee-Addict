// controller CRUD Data


// mengkoneksikan/memanggil file repo_user 
const transactionsRepo = require("../repo/repo_transactions");



// Menampilkan semua values yang ada pada table users
const get = async (req, res) => {
    try {
        console.log(req.query);
        const response = await transactionsRepo.getTransactions(req.query);
        res.status(200).json({
            result: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};


// menampilkan semua values berdasarkan ID yang dipilih pada params
const getId = async (req, res) => {
    try {
        console.log(req.params);
        const response = await transactionsRepo.getTransactionsId(req.params);
        res.status(200).json({
            result: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};


//  memasukan data kedalam table users
const create = async (req, res) => {
    try {
        const response = await transactionsRepo.createTransactions(req.body);
        res.status(201).json({
            result: response,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};


// Melakukan edit data berdasarkan ID pada table users
const edit = async (req, res) => {
    try {
        const response = await transactionsRepo.editTransactions(req.body, req.params)
        res.status(201).json({
            result: response,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};



// Delete data berdasarkan ID yang dipilih
const drop = async (req, res) => {
    try {
        const response = await transactionsRepo.deleteTransactions(req.params)
        res.status(201).json({
            result: response,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const transactionsController = {
    get,
    getId,
    create,
    edit,
    drop
}

module.exports = transactionsController;