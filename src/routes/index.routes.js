import { Router } from "express";
import clientRouter from "./client.routes.js";

const router = Router();

router.use(clientRouter);

export default router;