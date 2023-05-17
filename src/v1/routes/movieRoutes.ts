import express, { Request, Response } from "express";
import movieController from "../controllers/movieController";
const router = express.Router();

router.get("/title/:movieTitle/:userID", movieController.getMoviesByTitle);

router.get("/id/:imdbID/:userID", movieController.getOneMovieById);

export = router;
