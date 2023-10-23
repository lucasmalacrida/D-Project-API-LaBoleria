import db from "../database/database.connection.js";

export async function searchClient(phone) {
    const result = await db.query(`SELECT * FROM clients WHERE phone = $1;`, [phone]);
    return result;
}

export async function insertClient({ name, address, phone }) {
    const result = db.query(`INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3);`, [name, address, phone]);
    return result;
}