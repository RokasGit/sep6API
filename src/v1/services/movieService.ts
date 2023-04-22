import movieDB from "../../external/movie";

export default class MovieService {
  static async getAllMovies(): Promise<Array<String>> {
    return ["Get All Movies"];
  }
  static async getOneMovie(title: string): Promise<String> {
    try {
      const movie = await movieDB.getOneMovie(title);
      return movie;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
