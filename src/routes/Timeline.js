import UsersController from "../controllers/UsersController.js";
import { Router } from "express";

const router = Router()

router.get("/timeline", UsersController.listPosts)

export default router