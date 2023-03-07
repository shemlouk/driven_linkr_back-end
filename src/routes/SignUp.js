import controller from "../controllers/UsersController.js";
import validateBody from "../middlewares/validateBody.js";
import { Router } from "express";

const router = Router();

router.post("/signup", validateBody, controller.create);

export default router;
