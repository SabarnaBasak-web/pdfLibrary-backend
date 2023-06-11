import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
export const router = express.Router();
import { Ebook as EbookModel } from "../models/Ebook";
import { Author } from "../models/Author";
import { Category } from "../models/Category";
import { User } from "../models/User.model";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("File", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//  some comments
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

router.post(
  "/",
  upload.single("fileName"),
  async (req: Request, res: Response) => {
    try {
      console.log("request", req.body);

      const { name, description, authorName, categoryName, username } =
        req.body;
      const authorDetails = await Author.findOne({
        where: { name: authorName },
      });
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
      if (allCategories.length === 0) {
        //TODO: delete the file from the uploads folder
        res.json({
          status: 404,
          msg: "Category doesn't exists. Please create a category first",
        });
        return;
      }
      let newAuthor: Author | null = null;
      if (!authorDetails) {
        newAuthor = await Author.create({ name: authorName });
      }
      console.log("Upload", res.req.file?.filename);

      if (allCategories.length) {
        const EbookEntries = allCategories.map((category) => {
          return {
            name: name,
            description: description,
            AuthorId: newAuthor?.id || authorDetails?.id,
            CategoryId: category.id,
            UserId: userDetails?.id,
            fileName: res.req.file?.filename,
          };
        });

        const result = await EbookModel.bulkCreate(EbookEntries);
        if (result) {
          res.json({ status: 201, msg: "New Entries added" });
        }
      }
    } catch (err) {
      console.log("Some error occured ", err);
    }
  }
);
