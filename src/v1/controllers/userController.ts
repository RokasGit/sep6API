import { Request, Response } from 'express';
import userService from '../services/userService';

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
      res.status(400).json((error as Error).message);
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
      res.status(400).json((error as Error).message);
    }
  }
  static async getProfileByUser(req: Request, res: Response): Promise<void> {
    try {
      let userId = parseInt(req.params.userId);
      const responseFromService = await userService.getProfileByUser(userId);
      res.status(200).json(responseFromService);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const responseFromService = await userService.getUsers();
      res.status(200).json(responseFromService);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
