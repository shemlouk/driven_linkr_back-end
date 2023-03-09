import UsersController from "../controllers/UsersController.js";
import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";
import authentication from "../middlewares/authentication.js";

const router = Router()

router.get("/user/:id?", authentication, UsersController.listUserPosts)

export default router