import { Request, Response } from "express";
import movieService from "../services/movieService";

export default class MovieController {
  static async getAllMovies(req: Request, res: Response): Promise<void> {
    const allMovies = await movieService.getAllMovies();
    res.status(200).json(allMovies);
  }
  static async getOneMovie(req: Request, res: Response): Promise<void> {
    const movie = await movieService.getOneMovie(req.params.movieTitle);
    res.status(200).json(movie);
  }
}
