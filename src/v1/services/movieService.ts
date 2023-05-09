import movieDB from "../../external/movie";

export default class MovieService {
  static async getAllMovies(): Promise<Array<String>> {
    return ["Get All Movies"];
  }
  static async getOneMovieByTitle(title: string): Promise<String> {
    try {
      const movie = await movieDB.getOneMovieByTitle(title);
      return movie;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOneMovieById(movieId: String): Promise<String> {
    try {
      const movie = await movieDB.getOneMovieById(movieId);
      return movie;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
