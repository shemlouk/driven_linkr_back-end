import { Router } from "express";
import HashtagsController from "../controllers/HashtagsController.js";
import authentication from "../middlewares/authentication.js";

const router = Router();

router.get("/trending", authentication, HashtagsController.getTrending);

export default router;