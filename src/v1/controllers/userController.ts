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
      res.status(201).json(responseFromDB);
    } catch (error) {
      if ((error as Error).message === "User could not be registered") {
        res.status(400).json((error as Error).message);
      } else {
        res.status(500).json((error as Error).message);
      }
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const responseFromDB = await userService.loginUser(
        req.body.email,
        req.body.password
      );
      res.status(200).json(responseFromDB);
    } catch (error) {
      if (
        (error as Error).message === "Email does not exist" ||
        (error as Error).message === "Password is incorrect"
      ) {
        res.status(400).json((error as Error).message);
      } else {
        res.status(500).json((error as Error).message);
      }
    }
  }
  static async getProfileByUser(req: Request, res: Response): Promise<void> {
    try {
      let userId = parseInt(req.params.userId);
      const responseFromService = await userService.getProfileByUser(userId);
      res.status(200).json(responseFromService);
    } catch (error) {
      if (
        (error as Error).message === "User could not be found" ||
        (error as Error).message === "No toplist found" ||
        (error as Error).message === "No watchlist found"
      ) {
        res.status(400).json((error as Error).message);
      } else {
        res.status(500).json((error as Error).message);
      }
    }
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const responseFromService = await userService.getUsers();
      res.status(200).json(responseFromService);
    } catch (error) {
      if ((error as Error).message === "No users found") {
        res.status(400).json((error as Error).message);
      } else {
        res.status(500).json((error as Error).message);
      }
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const responseFromService = await userService.getUserById(
        parseInt(req.params.userId)
      );
      res.status(200).json(responseFromService);
    } catch (error) {
      if ((error as Error).message === "User could not be found") {
        res.status(400).json((error as Error).message);
      } else {
        res.status(500).json((error as Error).message);
      }
    }
  }
}
