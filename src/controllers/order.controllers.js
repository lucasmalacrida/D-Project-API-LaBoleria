import { searchClient, searchCake, insertOrder, selectOrders, selectOrderById } from "../repositories/order.repository.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity } = req.body;

    try {
        // Validations
        const client = await searchClient(clientId);
        if (client.rowCount === 0) { return res.sendStatus(404) }
        const cake = await searchCake(cakeId);
        if (cake.rowCount === 0) { return res.sendStatus(404) }

        // Post DB
        const totalPrice = Number(quantity * cake.rows[0].price);
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

export async function getOrderById(req, res) {
    const { id } = req.params;
    try {
        const order = await selectOrderById(id);
        if (order.rowCount === 0) { return res.sendStatus(404) }

        const orderObj = order.rows[0];
        const formatedOrder = {
            client: {
                id: orderObj.clientId,
                name: orderObj.clientName,
                address: orderObj.address,
                phone: orderObj.phone
            },
            cake: {
                id: orderObj.cakeId,
                name: orderObj.cakeName,
                price: orderObj.price,
                description: orderObj.description,
                image: orderObj.image
            },
            orderId: orderObj.id,
            createdAt: orderObj.createdAt,
            quantity: orderObj.createdAt,
            totalPrice: orderObj.totalPrice
        };
        res.send(formatedOrder);
    } catch (err) {
        res.status(500).send(err.message);
    }
}