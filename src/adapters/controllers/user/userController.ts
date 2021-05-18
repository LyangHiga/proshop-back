import { RequestHandler, Request, Response } from "express";
import IRepoUserStrategy from "../../../repositories/interfaces/IRepoUserStrategy";
// import { IGetUserAuthInfoRequest } from "../../types/req.types";

class UserController {
  public readonly repository: IRepoUserStrategy;
  constructor(productRepo: IRepoUserStrategy) {
    this.repository = productRepo;
  }

  authUser: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.repository.authUser(email, password);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  getUserProfile = async (req: Request, res: Response) => {
    try {
      let id: string;
      if (req.params.id && req.user.isAdmin) {
        id = req.params.id;
      } else {
        id = req.user._id;
      }

      const userProfile = await this.repository.getUserProfile(id);

      if (userProfile) {
        res.json(userProfile);
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "Not Authorized" });
    }
  };

  createUser: RequestHandler = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await this.repository.createUser(name, email, password);
      if (newUser) {
        res.json(newUser);
      } else {
        res.status(401).json({ message: "User was not created" });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "User was not created" });
    }
  };

  deleteUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
      // check if it's admin or the own user
      // not the own user and it is not an admin
      if (req.user._id !== id && !req.user.isAdmin) {
        res.status(401).json({
          message: "User was not Delete. Only Admin or the own user.",
        });
      } else {
        const deleted = this.repository.deleteUser(id);
        if (deleted) {
          res.json();
        } else {
          res.status(401).json({ message: "User was not deleted" });
        }
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "User was not deleted" });
    }
  };

  updateUserProfile: RequestHandler = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const updatedUser = await this.repository.updateUserProfile(
        req.user._id,
        name,
        email,
        password
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(401).json("User was not update");
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: `${err}` });
    }
  };

  // only for admin, not reuse updateUserProfile => single responsabolity
  updateUserByAdmin: RequestHandler = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;
    const { id } = req.params;
    try {
      const updatedUser = await this.repository.updateUserProfile(
        id,
        name,
        email,
        password,
        isAdmin
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(401).json("User was not update");
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(400).json({ message: `${err}` });
    }
  };

  getUsers: RequestHandler = async (req, res, next) => {
    try {
      const users = await this.repository.getUsers();
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: "No User Found" });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: `${err}` });
    }
  };
}

export default UserController;
