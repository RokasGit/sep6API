import { User } from "../models/user";
import { Watchlist } from "../models/watchlist";
import db from "./index";

export default class WatchlistData {
  static async addMovieIdToWatchlist(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      const response = await db.db("sep6.watchlist").returning("*").insert({
        user_id: userId,
        imdb_movie_id: movieId,
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getWatchlistBasedOnUserId(userId: number): Promise<string[]> {
    try {
      const response = await db
        .db("sep6.watchlist")
        .select("imdb_movie_id")
        .where("user_id", userId);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async deleteMovieFromWatchlist(
    userId: number,
    movieId: string
  ): Promise<string[]> {
    try {
      const deleting = await db
        .db("sep6.watchlist")
        .where({ imdb_movie_id: movieId, user_id: userId })
        .del();
      if (deleting > 0) {
        const response = await db
          .db("sep6.watchlist")
          .select("imdb_movie_id")
          .where("user_id", userId);
        return response;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async getWatchlistBasedOnUser(user: User): Promise<Watchlist> {
    try {
      const response = await db
        .db("sep6.watchlist")
        .select("imdb_movie_id")
        .where("user_id", user.userId)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw new Error("No watchlist found");
          } else {
            let movieIds: string[] = [];
            rows.forEach((element) => {
              movieIds.push(element.imdb_movie_id);
            });
            if (movieIds.length == 0) throw new Error("No watchlist found");
            if (user.userId == undefined) throw new Error("No user found");
            const watchlist: Watchlist = {
              userId: user.userId,
              movieIds: movieIds,
            };
            return watchlist;
          }
        })
        .catch((error) => {
          let movieIds: string[] = [];
          if (user.userId == undefined) throw new Error("No user found");

          if (error.message == "No user found") {
            throw new Error("No user found");
          }
          const watchlist: Watchlist = {
            userId: user.userId,
            movieIds: movieIds,
          };
          return watchlist;
        });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async isInWatchlist(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      const response = await db
        .db("sep6.watchlist")
        .where({ user_id: userId, imdb_movie_id: movieId })
        .first();
      return !!response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
