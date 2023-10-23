import { searchClientById, searchClientByPhone, insertClient, selectOrdersByClient } from "../repositories/client.repository.js";

export async function postClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        // Validations
        const client = await searchClientByPhone(phone);
        if (client.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        await insertClient(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrdersByClient(req, res) {
    const { id } = req.params;

    try {
        // Validation
        const client = await searchClientById(id);
        if (client.rowCount === 0) { return res.sendStatus(404) }

        // Select DB
        const orders = await selectOrdersByClient(id);
        res.send(orders.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}