"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUser = exports.updUser = exports.addUser = exports.getById = exports.getAll = void 0;
// get the client
const { createConnection, RowDataPacket } = require('mysql2');
// create the connection to database 
const connection = createConnection({
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
function getById(id) {
    return new Promise((resolve, rej) => {
        connection.query('SELECT * FROM user WHERE id=?', [id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res[0]);
        });
    });
}
exports.getById = getById;
function addUser(user) {
    return new Promise((resolve, rej) => {
        connection.query('INSERT INTO user (prenom,nom) VALUES (?,?)', [user.prenom, user.nom], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur ajouté");
        });
    });
}
exports.addUser = addUser;
function updUser(user) {
    return new Promise((resolve, rej) => {
        connection.query('UPDATE user SET prenom=?,nom=? WHERE id=?', [user.prenom, user.nom, user.id], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur modifié");
        });
    });
}
exports.updUser = updUser;
function delUser(id) {
    return new Promise((resolve, rej) => {
        connection.query('DELETE FROM user WHERE id=?', [id], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur supprimé");
        });
    });
}
exports.delUser = delUser;
