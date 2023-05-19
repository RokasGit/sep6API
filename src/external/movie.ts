import { Toplist } from "../models/toplist";
import { Search } from "../models/movie";
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

  static async getOneMovieById(movieId: string): Promise<string> {
    try {
      const response = await axios.get(`${db.OMDB_API_URL}i=${movieId}`);
      return response.data as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getMoviesArrayFromList(list: Toplist): Promise<Toplist> {
    try {
      const promises: any[] = [];
      list.movieIds.forEach((movieId) => {
        promises.push(this.getOneMovieById(movieId));
      });
      list.movies = await Promise.all(promises);
      return list;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMoviesByTitle(title: string): Promise<Search> {
    try {
      const response = await axios.get(`${db.OMDB_API_URL}s=${title}`);
      return response.data as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
