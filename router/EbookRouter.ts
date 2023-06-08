import express, { Request, Response } from "express";

export const router = express.Router();
import { Ebook as EbookModel } from "../models/Ebook";
import { Author } from "../models/Author";
import { Category } from "../models/Category";
import { User } from "../models/User.model";
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
  const { name, description, authorName, categoryName, username } = req.body;
  const authorDetails = await Author.findOne({ where: { name: authorName } });
  const userDetails = await User.findOne({
    where: {
      username: username,
    },
  });
  const allCategories = await Category.findAll({
    where: {
      name: categoryName.split(","),
    },
  });

  let newAuthor: Author | null = null;
  if (!authorDetails) {
    newAuthor = await Author.create({ name: authorName });
  }

  if (allCategories.length) {
    const EbookEntries = allCategories.map((category) => {
      return {
        name: name,
        description: description,
        AuthorId: newAuthor?.id || authorDetails?.id,
        CategoryId: category.id,
        UserId: userDetails?.id,
      };
    });

    const result = await EbookModel.bulkCreate(EbookEntries);
    if (result) {
      res.json("New Entries added");
    }
  }
});
