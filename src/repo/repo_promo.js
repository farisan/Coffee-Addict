const postgreDb = require("../config/postgre.js");



const getPromo = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from promo"
        postgreDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result)
        });
    });
};


const getPromoId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from promo where lower(name_promo) like lower($1) order by id_promo asc";
        postgreDb.query(query, [`%${params.name_promo}%`], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


const createPromo = (body) => {
    return new Promise((resolve, reject) => {
        const query = "insert into promo (name_promo, discount, minimal_price, maximal_price, start_promo, end_promo, describe_promo, id_product) values ($1,$2,$3,$4,$5,$6,$7,$8)";
        const { name_promo, discount, minimal_price, maximal_price, start_promo, end_promo, describe_promo, id_product } = body;
        postgreDb.query(
            query,
            [name_promo, discount, minimal_price, maximal_price, start_promo, end_promo, describe_promo, id_product],
            (err, queryResult) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(queryResult);
            });
    });
};


const editPromo = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update promo set ";            // gunakan spasi di akhir setelah set
        const values = [];
        // menggunakan perulangan untuk dapat melakukan pengubahan semua data pada table promo
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id_promo = $${idx + 2}`;
                values.push(body[key], params.id_promo);
                return;
            }
            query += `${key} = $${idx + 1},`;
            values.push(body[key]);
        });
        postgreDb
            .query(query, values)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

const deletePromo = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from promo where id_promo = $1";
        postgreDb.query(query, [params.id_promo], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};




const promoRepo = {
    getPromo,
    getPromoId,
    createPromo,
    editPromo,
    deletePromo
}

module.exports = promoRepo;