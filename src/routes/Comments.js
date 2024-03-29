import CommentsController from "../controllers/CommentsController.js";
import authentication from "../middlewares/authentication.js";
import validateBody from "../middlewares/validateBody.js";
import { Router } from "express";

const router = Router();

router.post("/comment", authentication, validateBody, CommentsController.create);
router.get("/post/:id/comments", authentication, CommentsController.getComments);

export default router;