import db from "../database/database.connection.js";

export async function postClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        // Validations
        const client = await db.query(`SELECT * FROM clients WHERE phone = $1;`, [phone]);
        if (client.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        await db.query(`INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3);`, [name, address, phone]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}