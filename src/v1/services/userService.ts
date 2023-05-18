import db from '../../database/user';
import { Toplist } from '../../models/toplist';
import { User } from '../../models/user';
import { use } from '../routes/movieRoutes';
import movieService from './movieService';
import toplistService from './toplistService';

export default class UserService {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | string> {
    if (username.length < 3 || password.length < 3 || email.length < 3) {
      throw Error(
        'Username, password and email must be at least 3 characters long'
      );
    }
    if (!email.includes('@')) {
      throw Error('Email must contain @');
    }
    if (username.includes(' ')) {
      throw Error('Username must not contain spaces');
    }
    // check if email does not contain special characters
    if (email.match(/[^a-zA-Z0-9@.]/g)) {
      throw Error('Email must not contain special characters');
    }
    if (email.includes(' ')) {
      throw Error('Email must not contain spaces');
    }
    if (username.match(/[^a-zA-Z0-9]/g)) {
      throw Error('Username must not contain special characters');
    }
    const emailExists = await db.checkIfEmailExists(email);
    if (emailExists) {
      throw Error('Email already exists');
    }
    return await db.registerUser(username, password, email);
  }

  static async loginUser(
    email: string,
    password: string
  ): Promise<User | string> {
    const user = await db.loginUser(email, password);
    if (typeof user === 'string') {
      throw Error(user);
    }
    return user;
  }
  static async getProfileByUser(
    userId: number
  ): Promise<{ user: User; toplist: Toplist } | string> {
    try {
      const user = await db.getProfileById(userId);
      if (typeof user === 'string') {
        throw Error(user);
      }
      if (user !== undefined && user !== null) {
        let toplist = await toplistService.getToplistBasedOnUser(user);
        console.log(JSON.stringify(toplist));
        toplist = await movieService.getMoviesArrayFromToplist(toplist);
        return { user, toplist };
      } else {
        throw Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUsers(): Promise<User[] | string> {
    try {
      const users = await db.getUsers();
      if (typeof users === 'string') {
        throw Error(users);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
}
