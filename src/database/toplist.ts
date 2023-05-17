import e from "express";
import { Toplist } from "../models/toplist";
import { User } from "../models/user";
import db from "./index";

export default class ToplistData {
  static async addMovieIdToToplist(
    userId: number,
    movieId: string
  ): Promise<boolean> {
    try {
      const response = await db.db("sep6.toplist").returning('*').insert({
        user_id: userId,
        imdb_movie_id: movieId,
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getToplistBasedOnUserId(userId: number): Promise<string[]> {
    try {
      const response = await db
        .db("sep6.toplist")
        .select("imdb_movie_id")
        .where("user_id", userId);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async deleteMovieFromToplist(
    userId: number,
    movieId: string
  ): Promise<string[]> {
    try {
      const deleting = await db
        .db("sep6.toplist")
        .where({ imdb_movie_id: movieId, user_id: userId })
        .del();
      if (deleting > 0) {
        const response = await db
          .db("sep6.toplist")
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
  static async getToplistBasedOnUser(user: User): Promise<Toplist> {
    try {
      const response = await db
        .db("sep6.toplist")
        .select("imdb_movie_id")
        .where("user_id", user.userId)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw new Error("No toplist found");
          } else {
            let movieIds: string[] = [];
            rows.forEach((element) => {
              movieIds.push(element.imdb_movie_id);
            });
            if (movieIds.length == 0) throw new Error("No toplist found");
            if (user.userId == undefined) throw new Error("No user found");
            const toplist: Toplist = {
              userId: user.userId,
              movieIds: movieIds,
            };
            return toplist;
          }
        })
        .catch((error) => {
          let movieIds: string[] = [];
          if (user.userId == undefined) throw new Error("No user found");

          if (error.message == "No user found") {
            throw new Error("No user found");
          }
          const toplist: Toplist = {
            userId: user.userId,
            movieIds: movieIds,
          };
          return toplist;
        });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
  };
  }
  static async isInToplist(userId: number, movieId: string) : Promise<boolean> {
    try {
      const response = await db.db("sep6.toplist").where({ user_id: userId, imdb_movie_id: movieId })
      .first();
      return !!response;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
