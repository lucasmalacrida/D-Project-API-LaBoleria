import db from "../database/database.connection.js";

export async function searchCake(name) {
    const result = await db.query(`SELECT * FROM cakes WHERE name = $1;`, [name]);
    return result;
}

export async function insertCake({ name, price, image, description }) {
    const result = await db.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1,$2,$3,$4);`, [name, price, image, description]);
    return result;
}