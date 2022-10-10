const postgreDb = require("../config/postgre");


// untuk menampilkan semua data table users
const getUser = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from users order by id_users asc";
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
const getUserId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from users where id_users = $1";
        postgreDb.query(query, [params.id_users], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


// memasukan data kedalam table users
const createUser = (body) => {
    return new Promise((resolve, reject) => {
        const query = "insert into users (displayname, lastname, password_user, email, phone, gender, birthday, address, picture_users) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
        const { displayname, lastname, password_user, email, phone, gender, birthday, address, picture_users } = body;
        postgreDb.query(
            query,
            [displayname, lastname, password_user, email, phone, gender, birthday, address, picture_users],
            (err, queryResult) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(queryResult);
            });
    });
};

const editUser = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update users set ";            // gunakan spasi di akhir setelah set
        const values = [];
        // menggunakan perulangan untuk dapat melakukan pengubahan semua data pada table users
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id_users = $${idx + 2}`;
                values.push(body[key], params.id_users);
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

const deleteUser = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from users where id_users = $1";
        postgreDb.query(query, [params.id_users], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};


const userRepo = {
    getUser,
    getUserId,
    createUser,
    editUser,
    deleteUser

}

module.exports = userRepo;