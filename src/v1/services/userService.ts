import db from "../../database/user";
import { User } from "../../models/user";

export default class UserService {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | string> {
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
}
