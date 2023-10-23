import db from "../database/database.connection.js";

export async function searchClient(id) {
    const result = await db.query(`SELECT * FROM clients WHERE id = $1;`, [id]);
    return result;
}

export async function searchCake(id) {
    const result = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [id]);
    return result;
}

export async function insertOrder(clientId, cakeId, quantity, totalPrice) {
    const result = await db.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1,$2,$3,$4);`, [clientId, cakeId, quantity, totalPrice]);
    return result;
}