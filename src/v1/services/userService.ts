import db from "../../database/user";
import { User } from "../../models/user";

export default class UserService {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | string> {
    if (username.length < 3 || password.length < 3 || email.length < 3) {
      throw "Username, password and email must be at least 3 characters long";
    }
    if (!email.includes("@")) {
      throw "Email must be valid";
    }
    if (username.includes(" ")) {
      throw "Username must not contain spaces";
    }
    // check if email does not contain special characters
    if (email.match(/[^a-zA-Z0-9@.]/g)) {
      throw "Email must not contain special characters";
    }
    if (email.includes(" ")) {
      throw "Email must not contain spaces";
    }
    if (username.match(/[^a-zA-Z0-9]/g)) {
      throw "Username must not contain special characters";
    }
    return await db.registerUser(username, password, email);
  }
}
