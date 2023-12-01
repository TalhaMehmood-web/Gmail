import express from "express";
import uploadFile from "../middleware/FileUpload.js";
import { SignUp, Login } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", uploadFile.single("picture"), SignUp)
router.post("/login", Login)

export default router;