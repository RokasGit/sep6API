import db from "./index";
import { User } from "../models/user";
import e from "express";

export default class UserData {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    try {
      const response = await db
        .db("sep6._user")
        .insert({
          username: username,
          password: password,
          email: email,
        })
        .returning("*")
        .then((rows) => {
          console.log(rows);
          if (rows === undefined || rows.length == 0) {
            throw Error("User could not be registered");
          }
          return {
            userId: rows[0].user_id,
            username: rows[0].username,
            email: rows[0].email,
            password: rows[0].password,
          };
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const response = await db
        .db("sep6._user")
        .select("*")
        .where("email", "=", email)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            return false;
          }
          return true;
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async loginUser(email: string, password: string): Promise<User> {
    try {
      const response = await db
        .db("sep6._user")
        .select("*")
        .where("email", "=", email)
        .andWhere("password", "=", password)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw Error("Password is incorrect");
          }
          return {
            userId: rows[0].user_id,
            username: rows[0].username,
            email: rows[0].email,
            password: rows[0].password,
          };
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getProfileById(userId: number): Promise<User> {
    try {
      console.log(userId);
      const response = await db
        .db("sep6._user")
        .select("*")
        .where("user_id", userId)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw Error("User could not be found");
          }
          return {
            userId: rows[0].user_id,
            username: rows[0].username,
            email: "none",
            password: "none",
          };
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUsers(): Promise<User[]> {
    try {
      const response = await db
        .db("sep6._user")
        .select("*")
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw Error("No users found");
          }
          return rows.map((row) => {
            return {
              userId: row.user_id,
              username: row.username,
              email: row.email,
              password: row.password,
            };
          });
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserById(userId: number): Promise<User> {
    try {
      const response = await db
        .db("sep6._user")
        .select("*")
        .where("user_id", userId)
        .then((rows) => {
          if (rows === undefined || rows.length == 0) {
            throw Error("User could not be found");
          }
          return {
            userId: rows[0].user_id,
            username: rows[0].username,
            email: rows[0].email,
            password: rows[0].password,
          };
        });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
