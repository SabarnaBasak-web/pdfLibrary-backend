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
const Category_1 = require("../models/Category");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newCategory = yield Category_1.Category.create({ name: name });
    console.log(newCategory);
    if (newCategory) {
        res.json("New category added");
    }
}));
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield Category_1.Category.findAll();
    try {
        if (allCategories.length) {
            res.json(allCategories);
        }
    }
    catch (err) {
        console.log("Something went wrong", err);
    }
}));
