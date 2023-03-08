import { Router } from "express";
import HashtagsController from "../controllers/HashtagsController.js";
import authentication from "../middlewares/authentication.js";
import validateBody from "../middlewares/validateBody.js";

const router = Router();

router.get("/trending", authentication, HashtagsController.getTrending);
router.get("/hashtag/:id", authentication, HashtagsController.getPostsWithHashtagId);

export default router;