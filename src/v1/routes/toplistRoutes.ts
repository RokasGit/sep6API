import express, { Request, Response } from "express"
import toplistController from "../controllers/toplistController"
const router = express.Router();

router.get("/:userId", toplistController.addMovieIdBasedOnUserId);

export = router;