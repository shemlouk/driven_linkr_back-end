import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// routes ----------------------

app.use(SignUp);
app.use(SignIn);

// -----------------------------

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
