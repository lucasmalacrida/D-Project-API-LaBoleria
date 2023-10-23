import { Router } from "express";
import clientRouter from "./client.routes.js";
import cakeRouter from "./cake.routes.js";

const router = Router();

router.use(clientRouter);
router.use(cakeRouter);

export default router;