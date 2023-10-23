import { Router } from "express";
import { postOrder, getOrders } from "../controllers/order.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { OrderSchema } from "../schemas/order.schemas.js";

const orderRouter = Router();

orderRouter.post('/orders', validateSchema(OrderSchema), postOrder);
orderRouter.get('/orders', getOrders);

export default orderRouter;