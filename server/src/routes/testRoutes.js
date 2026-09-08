import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/test", authMiddleware, (req, res) => {
    return res.status(200).json({ message: "You are authorized", userId: req.user });
});

router.post("/api/groups", authMiddleware, (req, res) => {
    return res.status(200).json({ message: "Group created successfully", userId: req.user });
});


export default router;