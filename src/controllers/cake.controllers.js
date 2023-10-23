import { searchCake, insertCake } from "../repositories/cake.repository.js";

export async function postCake(req, res) {
    const { name, price, image, description } = req.body;

    try {
        // Validations
        const cake = await searchCake(name);
        if (cake.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        await insertCake(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}