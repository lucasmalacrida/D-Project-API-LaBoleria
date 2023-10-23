import { Router } from "express";
import clientRouter from "./client.routes.js";
import cakeRouter from "./cake.routes.js";
import orderRouter from "./order.routes.js";

const router = Router();

router.use(clientRouter);
router.use(cakeRouter);
router.use(orderRouter);

export default router;