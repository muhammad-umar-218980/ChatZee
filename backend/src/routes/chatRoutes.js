import express from "express";
import { handleChat, getSessionMessages } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:sessionId", getSessionMessages);
router.post("/:sessionId", handleChat);

export default router;
