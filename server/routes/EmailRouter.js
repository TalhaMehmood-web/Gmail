import express from "express";
import protect from "../middleware/AuthMiddleware.js";
import { SendMail, allMails, starred, bin } from "../controllers/EmailController.js";
const router = express.Router();


router.post("/send-email", protect, SendMail)
router.get("/inbox", protect, allMails)
router.put("/starred", protect, starred)
router.put("/bin", protect, bin)
export default router;


