import { searchClient, searchCake, insertOrder, selectOrders } from "../repositories/order.repository.js";

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

export async function getOrders(req, res) {
    const date = req.query.date;
    try {
        const orders = await selectOrders(date);
        const formatedOrders = orders.rows.map(r => ({
            client: {
                id: r.clientId,
                name: r.clientName,
                address: r.address,
                phone: r.phone
            },
            cake: {
                id: r.cakeId,
                name: r.cakeName,
                price: r.price,
                description: r.description,
                image: r.image
            },
            orderId: r.id,
            createdAt: r.createdAt,
            quantity: r.createdAt,
            totalPrice: r.totalPrice
        }));
        if (formatedOrders.length === 0) { return res.status(404).send([]) }
        res.send(formatedOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
}