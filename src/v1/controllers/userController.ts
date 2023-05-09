import { Request, Response } from "express";
import userService from "../services/userService";

export default class UserController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const responseFromDB = await userService.registerUser(
        req.body.username,
        req.body.password,
        req.body.email
      );
      res.status(200).json(responseFromDB);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
