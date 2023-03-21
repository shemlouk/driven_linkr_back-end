import UsersController from "../controllers/UsersController.js";
import authentication from "../middlewares/authentication.js";
import { Router } from "express";

const router = Router();

router.get("/user/search", UsersController.filterByName);
router.get("/user/:id?", authentication, UsersController.listUserPosts);
router.delete("/user/post/:id", authentication, UsersController.deletePost);
router.post("/user/network/:id", authentication, UsersController.network);
router.get("/user/me/network", authentication, UsersController.getNetwork);

export default router;
