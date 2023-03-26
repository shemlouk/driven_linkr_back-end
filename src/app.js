import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Comments from "./routes/Comments.js";
import Timeline from "./routes/Timeline.js";
import Hashtag from "./routes/Hashtag.js";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";
import Repost from "./routes/Repost.js";
import Users from "./routes/Users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// routes ----------------------

app.use(Timeline);
app.use(Comments);
app.use(Hashtag);
app.use(SignUp);
app.use(SignIn);
app.use(Repost);
app.use(Users);

// -----------------------------

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
