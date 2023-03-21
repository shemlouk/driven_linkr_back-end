import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";
import Hashtag from "./routes/Hashtag.js";
import Timeline from "./routes/Timeline.js";
import Users from "./routes/Users.js"
import Comments from "./routes/Comments.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// routes ----------------------

app.use(SignUp);
app.use(SignIn);
app.use(Hashtag);
app.use(Timeline);
app.use(Comments);
app.use(Users)

// -----------------------------

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
