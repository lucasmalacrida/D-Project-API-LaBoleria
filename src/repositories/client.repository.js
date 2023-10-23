import db from "../database/database.connection.js";

export async function searchClient(phone) {
    return await db.query(`SELECT * FROM clients WHERE phone = $1;`, [phone]);
}

export async function insertClient({ name, address, phone }) {
    return await db.query(`INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3);`, [name, address, phone]);
}