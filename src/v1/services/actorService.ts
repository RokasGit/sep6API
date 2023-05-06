import actorDB from "../../external/actor";
import { Actor } from "../../models/actor";

export default class MovieService {
    static async getActorByName(name: string): Promise<Actor[]> {
      try {
        const actor = await actorDB.searchActor(name);
        return actor;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }