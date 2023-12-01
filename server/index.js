import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/UserRouter.js"
import EmailRouter from "./routes/EmailRouter.js"
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", () => {
    console.log("Database Connected");
})
app.use("/api/user", UserRouter)
app.use("/api/email", EmailRouter)
app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
})