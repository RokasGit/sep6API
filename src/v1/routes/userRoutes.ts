import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
const router = express.Router();

router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profile/:userId", UserController.getProfileByUser);
router.get("/all-users", UserController.getUsers);
router.get("/all-users/:userId", UserController.getUserById);
export = router;
