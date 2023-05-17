import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
const router = express.Router();

router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/:userId", UserController.getProfileByUser);
export = router;
