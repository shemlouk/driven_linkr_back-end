import UsersController from "../controllers/UsersController.js";
import authentication from "../middlewares/authentication.js";
import validateBody from "../middlewares/validateBody.js";
import { Router } from "express";

const router = Router()

router.get("/user/:id?", authentication, UsersController.listUserPosts)

export default router