import movieDB from "../../external/movie";
import { Search } from "../../models/movie";

export default class MovieService {
  static async getMoviesByTitle(title: string): Promise<Search> {
    try {
      const movies = await movieDB.getMoviesByTitle(title);
      return movies;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getOneMovieByTitle(title: string): Promise<string> {
    try {
      const movie = await movieDB.getOneMovieByTitle(title);
      return movie;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOneMovieById(movieId: string): Promise<string> {
    try {
      const movie = await movieDB.getOneMovieById(movieId);
      return movie;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
