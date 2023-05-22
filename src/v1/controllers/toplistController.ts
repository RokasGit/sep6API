import { Request, Response } from "express";
import toplistService from "../services/toplistService";
import movieService from "../services/movieService";
import WatchlistService from "../services/watchlistService";
import { Movie } from "../../models/movie";

export default class ToplistController {
  static async addMovieIdBasedOnUserId(req: Request, res: Response) {
    try {
      const responseFromDB = await toplistService.addMovieIdBasedOnUser(
        parseInt(req.params.userId),
        req.body.imdbID
      );
      let responseBody;
      if (responseFromDB) {
        let body = req.body;
        body.BelongsToToplist = true;
        responseBody = body;
      } else {
        responseBody = undefined;
      }
      res.status(200).json(responseBody);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  static async getToplistBasedOnUserId(req: Request, res: Response) {
    try {
      const responseFromDB = await toplistService.getToplistBasedOnUserId(
        parseInt(req.params.userId)
      );
      let responseBody: string[] = [];
      const promises: any[] = [];
      responseFromDB.forEach((movieId) => {
        promises.push(
          movieService.getOneMovieById(Object.entries(movieId)[0][1])
        );
      });
      responseBody = await Promise.all(promises);
      const modifiedObjects = await Promise.all(
        responseBody.map(async (movie) => {
          const JSONobject = JSON.parse(JSON.stringify(movie));
          JSONobject.BelongsToWatchlist = await WatchlistService.isInWatchlist(
            parseInt(req.params.userId),
            JSONobject.imdbID
          );
          return JSONobject;
        })
      );
      res.status(200).json(modifiedObjects);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  static async deleteMovieFromToplist(req: Request, res: Response) {
    try {
      const responseFromDB = await toplistService.deleteMovieFromToplist(
        parseInt(req.params.userId),
        req.body.imdbID
      );
      let responseBody: string[] = [];
      const promises: any[] = [];
      responseFromDB.forEach((movieId) => {
        promises.push(
          movieService.getOneMovieById(Object.entries(movieId)[0][1])
        );
      });
      responseBody = await Promise.all(promises);
      res.status(200).json(responseBody);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
