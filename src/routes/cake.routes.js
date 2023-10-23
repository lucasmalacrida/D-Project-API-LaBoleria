import { Router } from "express";
import { postCake } from "../controllers/cake.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { CakeSchema } from "../schemas/cake.schemas.js";

const cakeRouter = Router();

cakeRouter.post('/cakes', validateSchema(CakeSchema), postCake);

export default cakeRouter;