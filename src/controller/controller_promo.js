const promoRepo = require("../repo/repo_promo");



const get = async (req, res) => {
    try {
        console.log(req.query);
        const response = await promoRepo.getPromo(req.query)
        res.status(200).json({
            result: response.rows,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    };
};


const getId = async (req, res) => {
    try {
        console.log(req.params);
        const response = await promoRepo.getPromoId(req.params)
        res.status(200).json({
            result: response.rows,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    };
};


const create = async (req, res) => {
    try {
        const response = await promoRepo.createPromo(req.body);
        res.status(201).json({
            result: response,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};



const edit = async (req, res) => {
    try {
        const response = await promoRepo.editPromo(req.body, req.params)
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
        const response = await promoRepo.deletePromo(req.params)
        res.status(201).json({
            result: response,
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}


const promoController = {
    get,
    getId,
    create,
    edit,
    drop
}

module.exports = promoController;