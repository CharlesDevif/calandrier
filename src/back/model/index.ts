// get the client
const { createConnection, RowDataPacket } = require('mysql2');
import { IEvent } from '../../interfaces/event';

// create the connection to database 
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'calendrier'
});

export function getAll(): Promise<IEvent[]> {
    return new Promise((resolve, rej) => {
        connection.query('SELECT * FROM event',
            (err: Error, res: typeof RowDataPacket[]) => {
                if (err) rej(err)
                else resolve(res as IEvent[])
            })
    })
}
export function getById(id: number) {
    return new Promise((resolve, rej) => {
        connection.query('SELECT * FROM event WHERE id=?',
            [id],
            (err: Error, res: typeof RowDataPacket[]) => {
                if (err) rej(err)
                else resolve(res[0] as IEvent)
            })
    })
}
export function addEvent(event: IEvent) {
    return new Promise((resolve, rej) => {
        connection.query('INSERT INTO event (date_deb,date_fin) VALUES (?,?)',
            [event.date_deb, event.date_fin],
            (err: Error) => {
                if (err) rej(err)
                else resolve("Utilisateur ajouté")
            })
    })
}

export function updEvent(event: IEvent) {
    return new Promise((resolve, rej) => {
        connection.query('UPDATE event SET prenom=?,nom=? WHERE id=?',
            [event.date_deb, event.date_fin, event.id],
            (err: Error) => {
                if (err) rej(err)
                else resolve("Utilisateur modifié")
            })
    })
}
export function delEvent(id: number) {
    return new Promise((resolve, rej) => {
        connection.query('DELETE FROM event WHERE id=?',
            [id],
            (err: Error) => {
                if (err) rej(err)
                else resolve("Utilisateur supprimé")
            })
    })
}