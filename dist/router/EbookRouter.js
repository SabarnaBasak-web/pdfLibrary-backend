"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const Ebook_1 = require("../models/Ebook");
const Author_1 = require("../models/Author");
const Category_1 = require("../models/Category");
const User_model_1 = require("../models/User.model");
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooks = yield Ebook_1.Ebook.findAll();
        console.log("all books", allBooks);
        if (allBooks) {
            res.json(allBooks);
        }
    }
    catch (err) {
        console.log("Error", err);
    }
}));
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, authorName, categoryName, username } = req.body;
    const authorDetails = yield Author_1.Author.findOne({ where: { name: authorName } });
    const userDetails = yield User_model_1.User.findOne({
        where: {
            username: username,
        },
    });
    const allCategories = yield Category_1.Category.findAll({
        where: {
            name: categoryName.split(","),
        },
    });
    let newAuthor = null;
    if (!authorDetails) {
        newAuthor = yield Author_1.Author.create({ name: authorName });
    }
    if (allCategories.length) {
        const EbookEntries = allCategories.map((category) => {
            return {
                name: name,
                description: description,
                AuthorId: (newAuthor === null || newAuthor === void 0 ? void 0 : newAuthor.id) || (authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.id),
                CategoryId: category.id,
                UserId: userDetails === null || userDetails === void 0 ? void 0 : userDetails.id,
            };
        });
        const result = yield Ebook_1.Ebook.bulkCreate(EbookEntries);
        if (result) {
            res.json("New Entries added");
        }
    }
}));
