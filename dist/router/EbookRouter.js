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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.router = express_1.default.Router();
const Ebook_1 = require("../models/Ebook");
const Author_1 = require("../models/Author");
const Category_1 = require("../models/Category");
const User_model_1 = require("../models/User.model");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log("File", file);
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
//  some comments
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
exports.router.post("/", upload.single("fileName"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("request", req.body);
        const { name, description, authorName, categoryName, username } = req.body;
        const authorDetails = yield Author_1.Author.findOne({
            where: { name: authorName },
        });
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
        if (allCategories.length === 0) {
            //TODO: delete the file from the uploads folder
            res.json({
                status: 404,
                msg: "Category doesn't exists. Please create a category first",
            });
            return;
        }
        let newAuthor = null;
        if (!authorDetails) {
            newAuthor = yield Author_1.Author.create({ name: authorName });
        }
        console.log("Upload", (_a = res.req.file) === null || _a === void 0 ? void 0 : _a.filename);
        if (allCategories.length) {
            const EbookEntries = allCategories.map((category) => {
                var _a;
                return {
                    name: name,
                    description: description,
                    AuthorId: (newAuthor === null || newAuthor === void 0 ? void 0 : newAuthor.id) || (authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.id),
                    CategoryId: category.id,
                    UserId: userDetails === null || userDetails === void 0 ? void 0 : userDetails.id,
                    fileName: (_a = res.req.file) === null || _a === void 0 ? void 0 : _a.filename,
                };
            });
            const result = yield Ebook_1.Ebook.bulkCreate(EbookEntries);
            if (result) {
                res.json({ status: 201, msg: "New Entries added" });
            }
        }
    }
    catch (err) {
        console.log("Some error occured ", err);
    }
}));
