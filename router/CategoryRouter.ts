import { Category as CategoryModel } from "../models/Category";
import express, { Request, Response } from "express";

export const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({ name: name });
  console.log(newCategory);
  if (newCategory) {
    res.json("New category added");
  }
});

router.get("/", async (req: Request, res: Response) => {
  const allCategories = await CategoryModel.findAll();
  try {
    if (allCategories.length) {
      res.json(allCategories);
    }
  } catch (err) {
    console.log("Something went wrong", err);
  }
});
