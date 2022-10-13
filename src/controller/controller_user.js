// Mengkoneksikan file repo users ke controller users
const userRepo = require("../repo/repo_user");

/* ============================================================== */

// Menampilkan semua values yang ada pada table users
const get = async (req, res) => {
    try {
        console.log(req.query);
        const response = await userRepo.getUser(req.query);
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
        const response = await userRepo.getUserId(req.params);
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
        const response = await userRepo.createUser(req.body);
        res.status(201).json({
            // result: response,
            msg: "Create Data Success",
            data: response.text = req.body
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
        const response = await userRepo.editUser(req.body, req.params)
        res.status(201).json({
            // result: response,
            msg: "Edit Data Success",
            data: response.text = req.body
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
        const response = await userRepo.deleteUser(req.params)
        res.status(201).json({
            // result: response,
            msg: "Delete Data Success",
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}



// Nama function di atas di bungkus menjadi object
const userController = {
    get,
    getId,
    create,
    edit,
    drop
}

module.exports = userController;