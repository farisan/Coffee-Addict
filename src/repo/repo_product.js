const { response } = require("express");
// Koneksi Database
const postgreDb = require("../config/postgre");

/* ========================================================================= */

// Get => Menampilkan semua data dalam tabel product
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


// Filter => search name product, category & sorting data
const filterProduct = (queryparams) => {
    return new Promise((resolve, reject) => {
        let query = "select * from product ";

        // Search Name Product
        if (queryparams.filter_name) {
            query += `where lower(name_product) like lower('%${queryparams.filter_name}%')`
        }

        // Search Category
        // Search Category & Name Product
        if (queryparams.category) {
            if (queryparams.filter_name) {
                query += `and lower(category) like lower('${queryparams.category}')`
            } else {
                query += `where lower(category) like lower('${queryparams.category}')`
            }
        }

        if (queryparams.sorting == "price_asc") {
            query += "order by price_product asc";
        }
        if (queryparams.sorting == "price_desc") {
            query += "order by price_product desc";
        }
        if (queryparams.sorting == "create_at_asc") {
            query += "order by create_at asc";
        }
        if (queryparams.sorting == "create_at_desc") {
            query += "order by create_at desc";
        }
        if (queryparams.sorting == "transactions_asc") {
            query = "select product.*, transactions.quanty from product inner join transactions on transactions.id_product = product.id_product order by transactions.quanty asc";
        }
        if (queryparams.sorting == "transactions_desc") {
            query = "select product.*, transactions.quanty from product inner join transactions on transactions.id_product = product.id_product order by transactions.quanty desc";
        }

        postgreDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


// Create => Input data product kedalam database
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


// Edit => Edit data product berdasarkan id product
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

// Delete => Hapus data product dari database
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


// Nama function di atas di bungkus dalam object
const repoProduct = {
    getProduct,
    filterProduct,
    createProduct,
    editProduct,
    deleteProduct
};

module.exports = repoProduct;