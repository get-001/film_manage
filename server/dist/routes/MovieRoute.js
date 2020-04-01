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
const express_1 = __importDefault(require("express"));
const MovieService_1 = require("../services/MovieService");
const ResponseHelper_1 = require("./ResponseHelper");
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    try {
        const result = yield MovieService_1.MovieService.findById(movieId);
        ResponseHelper_1.ResponseHelper.sendData(res, result);
    }
    catch (error) {
        ResponseHelper_1.ResponseHelper.sendError(res, "id有误");
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.MovieService.find(req.query);
    ResponseHelper_1.ResponseHelper.sendPageData(res, result);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper_1.ResponseHelper.sendError(res, result);
    }
    else {
        ResponseHelper_1.ResponseHelper.sendData(res, result);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body: data } = req;
        const result = yield MovieService_1.MovieService.edit(id, data);
        if (result.length > 0) {
            ResponseHelper_1.ResponseHelper.sendError(res, result);
        }
        else {
            ResponseHelper_1.ResponseHelper.sendData(res, result);
        }
    }
    catch (error) {
        ResponseHelper_1.ResponseHelper.sendError(res, "id有误");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        const result = yield MovieService_1.MovieService.delete(movieId);
        ResponseHelper_1.ResponseHelper.sendData(res, result);
    }
    catch (error) {
        ResponseHelper_1.ResponseHelper.sendError(res, "id有误");
    }
}));
exports.default = router;
