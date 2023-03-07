import controller from "../controllers/SessionsController.js";
import validateBody from "../middlewares/validateBody.js";
import { Router } from "express";

const router = Router();

router.post("/signin", validateBody, controller.create);

export default router;
