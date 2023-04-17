import express, { Request, Response } from "express"
import movieController from "../controllers/movieController"
const router = express.Router();

router.get("/", movieController.getAllMovies);

router.get("/:movieTitle", movieController.getOneMovie);

export = router;

