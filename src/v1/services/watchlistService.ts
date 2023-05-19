import watchlistDB from "../../database/watchlist";
import { User } from "../../models/user";
import { Watchlist } from "../../models/watchlist";
//File change

export default class WatchlistService {
  static async addMovieIdBasedOnUser(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      return await watchlistDB.addMovieIdToWatchlist(userId, movieId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async getWatchlistBasedOnUserId(userId: number): Promise<string[]> {
    try {
      return await watchlistDB.getWatchlistBasedOnUserId(userId);
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
      return await watchlistDB.deleteMovieFromWatchlist(userId, movieId);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async getWatchlistBasedOnUser(user: User): Promise<Watchlist> {
    try {
      const response = await watchlistDB.getWatchlistBasedOnUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async isInWatchlist(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      return await watchlistDB.isInWatchlist(userId, movieId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
