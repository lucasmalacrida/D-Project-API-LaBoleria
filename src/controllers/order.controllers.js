import { searchClient } from "../repositories/order.repository.js";
import { searchCake } from "../repositories/order.repository.js";
import { insertOrder } from "../repositories/order.repository.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity } = req.body;

    try {
        // Validations
        const client = await searchClient(clientId);
        if (client.rowCount === 0) { return res.sendStatus(404) }
        const cake = await searchCake(cakeId);
        if (cake.rowCount === 0) { return res.sendStatus(404) }

        // Post DB
        const totalPrice = quantity * cake.rows[0].price;
        await insertOrder(clientId, cakeId, quantity, totalPrice);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}