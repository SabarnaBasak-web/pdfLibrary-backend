import express, { Request, Response } from "express";
export const router = express.Router();
import { Ebook as EbookModel } from "../models/Ebook";
router.get("/", async (req: Request, res: Response) => {
  try {
    const allBooks = await EbookModel.findAll();
    console.log("all books", allBooks);
    if (allBooks) {
      res.json(allBooks);
    }
  } catch (err) {
    console.log("Error", err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const result = await EbookModel.create({
    name: name,
    description: description,
  });
  if (result) {
    console.log("New Entry added");
    res.json("New Entry added");
  }
});
