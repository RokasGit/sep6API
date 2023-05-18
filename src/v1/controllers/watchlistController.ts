import { Request, Response } from "express";
import watchlistService from "../services/watchlistService"
import movieService from "../services/movieService";
import ToplistService from "../services/toplistService";

export default class WatchlistController {
    static async addMovieIdBasedOnUserId(req: Request, res: Response) {
        const responseFromDB = await watchlistService.addMovieIdBasedOnUser(
          parseInt(req.params.userId),
          req.body.imdbID
        );
        let responseBody;
        if (responseFromDB) {
          let body = req.body;
          body.BelongsToWatchlist = true;
          responseBody = body;
        } else {
          responseBody = undefined;
        }
        res.send({status: "OK", data: responseBody});
    };
    
    static async getWatchlistBasedOnUserId(req : Request, res : Response) {
        const responseFromDB = await watchlistService.getWatchlistBasedOnUser(parseInt(req.params.userId));
        let responseBody: String[]= [];
        const promises: any[] = [];
        responseFromDB.forEach( (movieId)=> {
            promises.push( movieService.getOneMovieById(Object.entries(movieId)[0][1]));
        });
        responseBody = await Promise.all(promises);
        const modifiedObjects = await Promise.all(responseBody.map(async(movie) => {
          const JSONobject = JSON.parse(JSON.stringify(movie));
          JSONobject.BelongsToToplist = await ToplistService.isInToplist(parseInt(req.params.userId), JSONobject.imdbID);
          return JSONobject;
        }));
        res.send({status: "OK", data: modifiedObjects});
    };

    static async deleteMovieFromWatchlist(req: Request, res: Response) {
      const responseFromDB = await watchlistService.deleteMovieFromWatchlist(
        parseInt(req.params.userId),
        req.body.imdbID
      );
      let responseBody: String[]= [];
      const promises: any[] = [];
      responseFromDB.forEach( (movieId)=> {
          promises.push( movieService.getOneMovieById(Object.entries(movieId)[0][1]));
      });
      responseBody = await Promise.all(promises);
      res.status(200).json(responseBody);
  };
}
