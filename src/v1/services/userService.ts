import db from "../../database/user";
import { Toplist } from "../../models/toplist";
import { User } from "../../models/user";
import { Watchlist } from "../../models/watchlist";
import { use } from "../routes/movieRoutes";
import movieService from "./movieService";
import toplistService from "./toplistService";
import WatchlistService from "./watchlistService";
import reviewService from "./reviewService";
import { Review } from "../../models/review";
export default class UserService {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    if (username.length < 3 || password.length < 3 || email.length < 3) {
      throw Error(
        "Username, password and email must be at least 3 characters long"
      );
    }
    if (!email.includes("@")) {
      throw Error("Email must contain @");
    }
    if (username.includes(" ")) {
      throw Error("Username must not contain spaces");
    }
    // check if email does not contain special characters
    if (email.match(/[^a-zA-Z0-9@.]/g)) {
      throw Error("Email must not contain special characters");
    }
    if (email.includes(" ")) {
      throw Error("Email must not contain spaces");
    }
    if (username.match(/[^a-zA-Z0-9]/g)) {
      throw Error("Username must not contain special characters");
    }
    const emailExists = await db.checkIfEmailExists(email);
    if (emailExists) {
      throw Error("Email already exists");
    }
    return await db.registerUser(username, password, email);
  }

  static async loginUser(email: string, password: string): Promise<User> {
    if ((await db.checkIfEmailExists(email)) === false) {
      throw Error("Email does not exist");
    }
    const user = await db.loginUser(email, password);
    if (typeof user === "string") {
      throw Error(user);
    }
    return user;
  }
  static async getProfileByUser(userId: number): Promise<{
    user: User;
    toplist: Toplist;
    watchlist: Watchlist;
    reviews: Review[];
  }> {
    try {
      const user = await db.getProfileById(userId);
      if (user !== undefined && user !== null) {
        let toplist = await toplistService.getToplistBasedOnUser(user);
        toplist = await movieService.getMoviesArrayFromList(toplist);
        let watchlist = await WatchlistService.getWatchlistBasedOnUser(user);
        watchlist = await movieService.getMoviesArrayFromList(watchlist);
        const reviews = await reviewService.getReviewsBasedOnUserId(
          user.userId ?? -1
        );
        return { user, toplist, watchlist, reviews };
      } else {
        throw Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUsers(): Promise<User[]> {
    try {
      const users = await db.getUsers();
      if (typeof users === "string") {
        throw Error(users);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId: number): Promise<User> {
    try {
      const user = await db.getUserById(userId);
      if (typeof user === "string") {
        throw Error(user);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
