import { Request, Response } from "express";
import movieService from "../services/movieService";
import ToplistService from "../services/toplistService";
import ReviewService from "../services/reviewService";
import { Movie, Search } from "../../models/movie";
import WatchlistService from "../services/watchlistService";

export default class MovieController {
  static async getMoviesByTitle(req: Request, res: Response): Promise<void> {
    try {
      const movies = await movieService.getMoviesByTitle(req.params.movieTitle);
      const userID = parseFloat(req.params.userID);
      

      const modifiedObjects = await Promise.all(
        movies.Search.map(async (movie: Movie) => {
          movie.BelongsToToplist = await ToplistService.isInToplist(
            userID,
            movie.imdbID
          );
          movie.BelongsToWatchlist = await WatchlistService.isInWatchlist(
            userID,
            movie.imdbID
          );

          const review = await ReviewService.isReviewed(userID, movie.imdbID);

          if (review) {
            movie.review = review;
          }

          return movie;
        })
      );
      res.status(200).json(modifiedObjects);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while searching for the movie." });
    }
  }

  static async getOneMovieById(req: Request, res: Response): Promise<void> {
    try {
      const movie = JSON.parse(
        JSON.stringify(await movieService.getOneMovieById(req.params.imdbID))
      );
      const userID = parseFloat(req.params.userID);
      

      const responseBody = new Promise(async () => {
        movie.BelongsToToplist = await ToplistService.isInToplist(
          userID,
          movie.imdbID
        );
        movie.BelongsToWatchlist = await WatchlistService.isInWatchlist(
          userID,
          movie.imdbID
        );

        const review = await ReviewService.isReviewed(userID, movie.imdbID);
        if (review) {
          movie.review = review;
        }

        res.status(200).json(movie);
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while searching for the movie." });
    }
  }

  static async getOneMovieById(req: Request, res: Response): Promise<void> {
    const movie = JSON.parse(JSON.stringify(await movieService.getOneMovieById(req.params.imdbID)));
    const userID = parseFloat(req.params.userID);
    const responseBody = new Promise(async() => {
      movie.BelongsToToplist = await ToplistService.isInToplist(userID, movie.imdbID);
      res.status(200).json(movie);
    });
  }
}
