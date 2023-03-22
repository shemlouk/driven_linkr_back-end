import UsersController from "../controllers/UsersController.js";
import authentication from "../middlewares/authentication.js";
import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";

const router = Router();

router.get("/user/search", UsersController.filterByName);
router.get("/user/:id?", authentication, UsersController.listUserPosts);
router.delete("/user/post/:id", authentication, UsersController.deletePost);
router.put("/user/post/:id", authentication, UsersController.editPost);

export default router;
