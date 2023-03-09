import { Router } from "express";
import HashtagsController from "../controllers/HashtagsController.js";
import authentication from "../middlewares/authentication.js";
import validateBody from "../middlewares/validateBody.js";

const router = Router();

router.get("/trending", authentication, HashtagsController.getTrending);
router.get("/hashtag/:id", authentication, HashtagsController.getPostsWithHashtagId);
router.get("/hashtag/search/:name", authentication, HashtagsController.getHashtagByName);
router.post("/hashtag", authentication, validateBody, HashtagsController.setHashtagName);

export default router;