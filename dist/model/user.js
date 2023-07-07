"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
// get the client
const mysql2_1 = require("mysql2");
// create the connection to database 
const connection = (0, mysql2_1.createConnection)({
    host: 'localhost',
    user: 'root',
    database: 'user'
});
function getAll() {
    return new Promise((resolve, rej) => {
        connection.query('SELECT * FROM user', (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
exports.getAll = getAll;
