import { Request, Response } from "express";
import actorService from "../services/actorService";

export default class ActorController {
  static async searchActor(req: Request, res: Response): Promise<void> {
    const actor = await actorService.getActorByName(req.params.actorName);
    res.send({ status: "OK", data: actor });
  }
}