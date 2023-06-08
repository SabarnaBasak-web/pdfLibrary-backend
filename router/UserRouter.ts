import express, { Request, Response } from "express";
import { User as UserModel } from "../models/User.model";
export const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const creationResult = await UserModel.create({
    username: username,
    password: password,
    email: email,
  });
  if (creationResult) res.json("New user created");
});
