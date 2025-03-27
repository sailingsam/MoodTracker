import { Router } from "express";
import { moodController } from "../controllers/moodController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = Router();

// Public test route
router.get("/test", moodController.test);

// Protected routes - require authentication
router.post("/analyze", authenticateUser, moodController.analyzeMood);
router.get("/history", authenticateUser, moodController.getMoodHistory);

export default router;
