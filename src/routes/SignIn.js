import controller from "../controllers/SessionsController.js";
import authentication from "../middlewares/authentication.js";
import validateBody from "../middlewares/validateBody.js";
import { Router } from "express";

const router = Router();

router.post("/signin", validateBody, controller.create);
router.delete("/signin", authentication, controller.delete);

export default router;
