import { Request, Response } from "express";
import movieService from "../services/movieService";
import ToplistService from "../services/toplistService";
import { Movie, Search } from "../../models/movie";
import WatchlistService from "../services/watchlistService";

export default class MovieController {
  static async getMoviesByTitle(req: Request, res: Response): Promise<void> {
    const movies = await movieService.getMoviesByTitle(req.params.movieTitle);
    const userID = parseFloat(req.params.userID);
    const modifiedObjects = await Promise.all(movies.Search.map(async(movie: Movie) => {
      movie.BelongsToToplist = await ToplistService.isInToplist(userID, movie.imdbID);
      movie.BelongsToWatchlist = await WatchlistService.isInWatchlist(userID, movie.imdbID);
      return movie;
    }));
    res.status(200).json(modifiedObjects);
  }
  
  static async getOneMovieByTitle(req: Request, res: Response): Promise<void> {
    const movie = await movieService.getOneMovieByTitle(req.params.movieTitle);
    res.status(200).json(movie);
  }

  static async getOneMovieById(req: Request, res: Response): Promise<void> {
    const movie = JSON.parse(JSON.stringify(await movieService.getOneMovieById(req.params.imdbID)));
    const userID = parseFloat(req.params.userID);
    const responseBody = new Promise(async() => {
      movie.BelongsToToplist = await ToplistService.isInToplist(userID, movie.imdbID);
      movie.BelongsToWatchlist = await WatchlistService.isInWatchlist(userID, movie.imdbID);
      res.status(200).json(movie);
    });
  }
}
