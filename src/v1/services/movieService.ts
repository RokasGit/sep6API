import movieDB from "../../external/movie";
import { Toplist } from "../../models/toplist";
import { Search } from "../../models/movie";

export default class MovieService {
  static async getMoviesByTitle(title: string): Promise<Search> {
    try {
      const movies = await movieDB.getMoviesByTitle(title);
      return movies;
    } catch (error) {
      throw error;
    }
  }
  static async getOneMovieByTitle(title: string): Promise<string> {
    try {
      const movie = await movieDB.getOneMovieByTitle(title);
      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async getOneMovieById(movieId: string): Promise<string> {
    try {
      const movie = await movieDB.getOneMovieById(movieId);
      return movie;
    } catch (error) {
      throw error;
    }
  }
  static async getMoviesArrayFromList(toplist: Toplist): Promise<Toplist> {
    try {
      const response = await movieDB.getMoviesArrayFromList(toplist);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
