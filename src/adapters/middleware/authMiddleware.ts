import { NextFunction, Response, Request } from "express";
// import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../repositories/db/mongo/models/userModel";
// import { IGetUserAuthInfoRequest } from "../types/req.types";

type decodedType = {
  id: string;
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: null | string = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as decodedType;
      const user = await UserModel.findById(decoded.id).select("-password")!;
      if (user) {
        req.user = user;
      }
    } catch (err) {
      console.log(`Error  ${err}`);
    }
    next();
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized, Admin only" });
  }
};
