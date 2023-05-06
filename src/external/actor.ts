import { Actor } from "../models/actor";
import db from "./../database/index";
import axios from "axios";


export default class ActorData {

  static getAverageRating(actorMovies: any) {

    let rating = 0;

    actorMovies.forEach((element: any) => {
      rating += element.vote_average;
    });

    const averageRating = rating / actorMovies.length;

    return Math.round(averageRating * 100) / 100;
  };


  static async searchActor(query: string): Promise<Actor[]> {
    try {
      const url = `${db.TMDB_BASE_URL}/search/person?api_key=${db.TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      const data:any = response.data;

      let actors: Actor[] = [];

      data.results.forEach((item: any) => {

        const actor: Actor = {
          ID: item.id,
          Name: item.name,
          Popularity: item.popularity,
          AverageRating: ActorData.getAverageRating(item.known_for),
          known_for: item.known_for
        }

        actors.push(actor);

      });

      return actors;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}