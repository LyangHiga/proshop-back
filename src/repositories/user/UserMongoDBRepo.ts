import IRepoUserStrategy from "../interfaces/IRepoUserStrategy";
import UserModel from "../db/mongo/models/userModel";
import bcrypt from "bcryptjs";
import { encrypt, generateToken } from "./utils";

import Profile, { AuthProfile } from "../../entities/Profile";

class UserMongoDBRepo implements IRepoUserStrategy {
  authUser = async (
    email: string,
    password: string
  ): Promise<AuthProfile | undefined> => {
    try {
      const user = await UserModel.findOne({ email });
      const matchPass = await bcrypt.compare(password, user!.password);
      if (user && matchPass) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        };
      } else {
        console.error(`Error: User not found`);
        return undefined;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  getUserProfile = async (id: string): Promise<Profile | undefined> => {
    try {
      const user = await UserModel.findById(id);
      if (user) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      } else {
        console.error(`Error: User not found`);
        return undefined;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  deleteUser = async (id: string): Promise<boolean | undefined> => {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (user) {
        return true;
      } else {
        console.error(`Error: User not found`);
        return false;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  createUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthProfile | undefined> => {
    try {
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        console.log("User already exists");
        return undefined;
      }

      const hashedPass = await encrypt(password);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPass,
      });

      if (user) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        };
      }

      console.log("User Created but not found!");
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  updateUserProfile = async (
    id: string,
    name?: string,
    email?: string,
    password?: string,
    isAdmin?: boolean
  ): Promise<AuthProfile | undefined> => {
    try {
      const user = await UserModel.findById(id);
      if (user) {
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? await encrypt(password) : user.password;
        user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

        const updatedUser = await user.save();
        return {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(user._id),
        };
      } else {
        console.error(`Error: User not found`);
        return undefined;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  getUsers = async () => {
    try {
      const users = (await UserModel.find().select(["-password"])) as Profile[];
      if (users) {
        return users;
      }
      console.error(`Error: No user found`);
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
}

export default UserMongoDBRepo;
