import db from "../database/database.connection.js";

export async function searchClientById(id) {
    const result = await db.query(`SELECT * FROM clients WHERE id = $1;`, [id]);
    return result;
}

export async function searchClientByPhone(phone) {
    const result = await db.query(`SELECT * FROM clients WHERE phone = $1;`, [phone]);
    return result;
}

export async function insertClient({ name, address, phone }) {
    const result = db.query(`INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3);`, [name, address, phone]);
    return result;
}

export async function selectOrdersByClient(id) {
    const result = await db.query(`
        SELECT orders.id AS "orderId", orders.quantity AS quantity, orders."createdAt" as "createdAt", orders."totalPrice" AS "totalPrice",
            cakes.name AS "cakeName"
        FROM orders
        JOIN clients ON clients.id = orders."clientId"
        JOIN cakes ON cakes.id = orders."cakeId"
        WHERE clients.id = $1
    ;`, [id]);

    return result;
}