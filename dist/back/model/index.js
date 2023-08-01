"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delEvent = exports.updEvent = exports.addEvent = exports.getById = exports.getAll = void 0;
// get the client
const { createConnection, RowDataPacket } = require('mysql2');
// create the connection to database 
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'calendrier'
});
function getAll() {
    return new Promise((resolve, rej) => {
        connection.query('SELECT * FROM event', (err, res) => {
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
        connection.query('SELECT * FROM event WHERE id=?', [id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res[0]);
        });
    });
}
exports.getById = getById;
function addEvent(event) {
    return new Promise((resolve, rej) => {
        connection.query('INSERT INTO event (date_deb,date_fin) VALUES (?,?)', [event.date_deb, event.date_fin], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur ajouté");
        });
    });
}
exports.addEvent = addEvent;
function updEvent(event) {
    return new Promise((resolve, rej) => {
        connection.query('UPDATE event SET prenom=?,nom=? WHERE id=?', [event.date_deb, event.date_fin, event.id], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur modifié");
        });
    });
}
exports.updEvent = updEvent;
function delEvent(id) {
    return new Promise((resolve, rej) => {
        connection.query('DELETE FROM event WHERE id=?', [id], (err) => {
            if (err)
                rej(err);
            else
                resolve("Utilisateur supprimé");
        });
    });
}
exports.delEvent = delEvent;
