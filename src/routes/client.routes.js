import { Router } from "express";
import { postClient } from "../Controllers/client.controllers.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { ClientSchema } from "../Schemas/client.schemas.js";

const userRouter = Router();

userRouter.post('/clients', validateSchema(ClientSchema), postClient);

export default userRouter;