import toplistDB from "../../database/toplist";
import { Toplist } from "../../models/toplist";
import { User } from "../../models/user";
//File change

export default class ToplistService {
  static async addMovieIdBasedOnUser(
    userId: number,
    movieId: String
  ): Promise<boolean> {
    try {
      return await toplistDB.addMovieIdToToplist(userId, movieId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async getToplistBasedOnUserId(userId: number): Promise<String[]> {
    try {
      return await toplistDB.getToplistBasedOnUserId(userId);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async deleteMovieFromToplist(
    userId: number,
    movieId: String
  ): Promise<String[]> {
    try {
      return await toplistDB.deleteMovieFromToplist(userId, movieId);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async getToplistBasedOnUser(user: User): Promise<Toplist> {
    try {
      const response = await toplistDB.getToplistBasedOnUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
