import toplistDB from "../../database/toplist";
import { Toplist } from "../../models/toplist";
import { User } from "../../models/user";
//File change

export default class ToplistService {
  static async addMovieIdBasedOnUser(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      return await toplistDB.addMovieIdToToplist(userId, movieId);
    } catch (error) {
      throw error;
    }
  }
  static async getToplistBasedOnUserId(userId: number): Promise<string[]> {
    try {
      return await toplistDB.getToplistBasedOnUserId(userId);
    } catch (error) {
      throw error;
    }
  }
  static async deleteMovieFromToplist(
    userId: number,
    movieId: string
  ): Promise<string[]> {
    try {
      return await toplistDB.deleteMovieFromToplist(userId, movieId);
    } catch (error) {
      throw error;
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
  static async isInToplist(userId: number, movieId: string): Promise<boolean> {
    try {
      return await toplistDB.isInToplist(userId, movieId);
    } catch (error) {
      throw error;
    }
  }
}
