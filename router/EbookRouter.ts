import express, { Request, Response } from "express";
export const router = express.Router();
import Ebook from "../models/Ebook";
router.get("/", (req: Request, res: Response) => {
  res.send("Ebook router");
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const result = await Ebook.create({ name: name, description: description });
  if (result) {
    console.log("New Entry added");
    res.json("New Entry added");
  }
});
