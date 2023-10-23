import { Router } from "express";
import { postOrder } from "../controllers/order.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { OrderSchema } from "../schemas/order.schemas.js";

const orderRouter = Router();

orderRouter.post('/orders', validateSchema(OrderSchema), postOrder);

export default orderRouter;