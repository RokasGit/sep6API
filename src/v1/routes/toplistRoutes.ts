import express, { Request, Response } from "express"
import toplistController from "../controllers/toplistController"
const router = express.Router();

router.get("/:userId/:movieId", toplistController.addMovieIdBasedOnUserId);

export = router;