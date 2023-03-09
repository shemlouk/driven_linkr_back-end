import UsersController from "../controllers/UsersController.js";
import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";
import authentication from "../middlewares/authentication.js";

const router = Router()

router.get("/timeline", authentication, UsersController.listPosts)
router.post("/timeline", authentication, validateBody, UsersController.publishPost)
router.post("/timeline/:postId/like", authentication, UsersController.likePost)

export default router