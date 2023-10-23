import { searchClient } from "../repositories/client.repository.js";
import { insertClient } from "../repositories/client.repository.js";

export async function postClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        // Validations
        const client = await searchClient(phone);
        if (client.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        await insertClient(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}