import { Request, Response } from "express";
import movieService from "../services/movieService";

export default class MovieController {
  static async getAllMovies(req: Request, res: Response): Promise<void> {
    const allMovies = await movieService.getAllMovies();
    res.send({ status: "OK", data: allMovies });
  }
  static async getOneMovie(req: Request, res: Response): Promise<void> {
    const movie = await movieService.getOneMovie(req.params.movieTitle);
    res.send({ status: "OK", data: movie });
  }
}
