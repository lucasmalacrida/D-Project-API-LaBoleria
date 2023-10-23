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

export async function selectOrders(date) {
    let result
    if (date) {
        result = await db.query(`
            SELECT orders.*,
                clients.name AS "clientName", clients.address AS address, clients.phone AS phone,
                cakes.name AS "cakeName", cakes.price AS price, cakes.description AS description, cakes.image AS image
            FROM orders
            JOIN clients ON clients.id = orders."clientId"
            JOIN cakes ON cakes.id = orders."cakeId"
            WHERE DATE(orders."createdAt") = $1
        ;`, [date]);
    } else {
        result = await db.query(`
            SELECT orders.*,
                clients.name AS "clientName", clients.address AS address, clients.phone AS phone,
                cakes.name AS "cakeName", cakes.price AS price, cakes.description AS description, cakes.image AS image
            FROM orders
            JOIN clients ON clients.id = orders."clientId"
            JOIN cakes ON cakes.id = orders."cakeId"
        ;`);
    }
    return result;
}

export async function selectOrderById(id) {
    const result = await db.query(`
        SELECT orders.*,
            clients.name AS "clientName", clients.address AS address, clients.phone AS phone,
            cakes.name AS "cakeName", cakes.price AS price, cakes.description AS description, cakes.image AS image
        FROM orders
        JOIN clients ON clients.id = orders."clientId"
        JOIN cakes ON cakes.id = orders."cakeId"
        WHERE orders.id = $1
    ;`, [id]);

    return result;
}