import { Router } from "express";
import { postClient } from "../controllers/client.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { ClientSchema } from "../schemas/client.schemas.js";

const clientRouter = Router();

clientRouter.post('/clients', validateSchema(ClientSchema), postClient);

export default clientRouter;