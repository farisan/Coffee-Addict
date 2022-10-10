const { response } = require("express");
const postgreDb = require("../config/postgre");



const getProduct = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from product order by id_product asc";
        postgreDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        })
    });
};


const filterProduct = () => {
    return new Promise((resolve, reject) => {

        const query =
            "select product.id_product, transactions.order_time, transactions.total from product inner join transactions on product.id_product = transactions.id_product order by product.id_product asc"
        postgreDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};



const getSearch = (queryparams) => {
    return new Promise((resolve, reject) => {
        const query = "select * from product where lower(name_product) like lower($1) or lower(size_product) like lower($2) order by id_product asc";
        postgreDb.query(query, [`${queryparams.name_product}`, `${queryparams.size_product}`], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};



const getCategory = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from product where lower(category) like lower($1) order by id_product asc";
        postgreDb.query(query, [`${params.category}`], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};



const createProduct = (body) => {
    return new Promise((resolve, reject) => {
        const query = "insert into product (name_product, picture_product, size_product, category, stock, price_product, describe_product) values ($1,$2,$3,$4,$5,$6,$7)";
        const { name_product, picture_product, size_product, category, stock, price_product, describe_product } = body
        postgreDb
            .query(query, [name_product, picture_product, size_product, category, stock, price_product, describe_product],
                (err, queryResult) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    resolve(queryResult);
                })
    })
}


const editProduct = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update product set ";          // gunakan spasi di akhir setelah set
        const values = [];
        // menggunakan perulangan untuk dapat melakukan pengubahan semua data pada table product
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id_product = $${idx + 2}`;
                values.push(body[key], params.id_product);
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

const deleteProduct = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from product where id_product = $1";
        postgreDb.query(query, [params.id_product], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


const repoProduct = {
    getProduct,
    getSearch,
    getCategory,
    createProduct,
    editProduct,
    deleteProduct,
    filterProduct

    // searchProduct
};

module.exports = repoProduct;