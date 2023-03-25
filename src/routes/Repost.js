import authentication from "../middlewares/authentication.js";
import controller from "../controllers/RepostsController.js";
import { Router } from "express";

const router = Router();

router.post("/repost/:id", authentication, controller.create);
router.delete("/repost/:id", authentication, controller.delete);

export default router;
