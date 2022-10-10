const postgreDb = require("../config/postgre");


// untuk menampilkan semua data table users
const getTransactions = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from transactions order by id_transaction asc";
        postgreDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// params => inputan berdasarkan data dari params  ex => localhost:6060/coffee/v1/user/(isi id user yang ingin di tampilkan)
const getTransactionsId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from transactions where id_transaction = $1";
        postgreDb.query(query, [params.id_transaction], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


// memasukan data kedalam table users
const createTransactions = (body) => {
    return new Promise((resolve, reject) => {
        const query = "insert into transactions (id_users, id_product, quanty, subtotal, tax, shipping_payment, payment, total, order_time) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
        const { id_users, id_product, quanty, subtotal, tax, shipping_payment, payment, total, order_time } = body;
        postgreDb.query(
            query,
            [id_users, id_product, quanty, subtotal, tax, shipping_payment, payment, total, order_time],
            (err, queryResult) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(queryResult);
            });
    });
};

const editTransactions = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update transactions set ";            // gunakan spasi di akhir setelah set
        const values = [];
        // menggunakan perulangan untuk dapat melakukan pengubahan semua data pada table users
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id_transaction = $${idx + 2}`;
                values.push(body[key], params.id_transaction);
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

const deleteTransactions = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from transactions where id_transaction = $1";
        postgreDb.query(query, [params.id_transaction], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


const transactionsRepo = {
    getTransactions,
    getTransactionsId,
    createTransactions,
    editTransactions,
    deleteTransactions

}

module.exports = transactionsRepo;