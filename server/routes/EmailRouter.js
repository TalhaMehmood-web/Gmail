import express from "express";
import protect from "../middleware/AuthMiddleware.js";
import { SendMail, allMails } from "../controllers/EmailController.js";
const router = express.Router();


router.post("/send-email", protect, SendMail)
router.get("/inbox", protect, allMails)
export default router;


