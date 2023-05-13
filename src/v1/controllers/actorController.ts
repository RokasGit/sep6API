import { Request, Response } from "express";
import actorService from "../services/actorService";

export default class ActorController {
  static async searchActor(req: Request, res: Response): Promise<void> {
    try {
      const actor = await actorService.getActorByName(req.params.searchActor);
      res.status(200).json(actor);
    } catch (error) {
      console.error(error);  // Optionally log the error
      res.status(500).json({ message: 'An error occurred while searching for the actor.' });
    }
  }
}
