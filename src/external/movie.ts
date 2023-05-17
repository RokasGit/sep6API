import { Toplist } from "../models/toplist";
import db from "./../database/index";
import axios from "axios";

export default class MovieData {
  static async getOneMovieByTitle(title: string): Promise<string> {
    try {
      const response = await axios.get(`${db.OMDB_API_URL}t=${title}`);
      return response.data as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOneMovieById(movieId: String): Promise<string> {
    try {
      const response = await axios.get(`${db.OMDB_API_URL}i=${movieId}`);
      return response.data as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getMoviesArrayFromToplist(toplist: Toplist): Promise<Toplist> {
    try {
      const promises: any[] = [];
      toplist.movieIds.forEach((movieId) => {
        promises.push(this.getOneMovieById(movieId));
      });
      toplist.movies = await Promise.all(promises);
      return toplist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
