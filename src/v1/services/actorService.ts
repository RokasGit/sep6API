import actorDB from "../../external/actor";
import { Actor } from "../../models/actor";

export default class ActorService {
  static async getActorByName(name: string): Promise<Actor[]> {
    try {
      const actor = await actorDB.searchActor(name);
      return actor;
    } catch (error) {
      throw error;
    }
  }
}
