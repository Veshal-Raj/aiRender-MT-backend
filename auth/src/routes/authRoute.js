import express from "express";
import { home, signUp, login } from "../controllers/authController";
import { verifyToken } from "../middlewares/verification";

const router = express.Router()


router.post('/login', login )
router.post('/signup', signUp)
router.post('/home', verifyToken, home )

export default router