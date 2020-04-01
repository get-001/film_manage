"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieRoute_1 = __importDefault(require("./routes/MovieRoute"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
const app = express_1.default();
app.use(express_1.default.json());
app.listen(80);
app.use("/api/movie", MovieRoute_1.default);
app.use("/api/upload", UploadRoute_1.default);
app.use("/upload", express_1.default.static("public/upload"));
