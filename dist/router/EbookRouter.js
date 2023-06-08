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
    const { name, description } = req.body;
    const result = yield Ebook_1.Ebook.create({
        name: name,
        description: description,
    });
    if (result) {
        console.log("New Entry added");
        res.json("New Entry added");
    }
}));
