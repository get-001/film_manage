"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ResponseHelper_1 = require("./ResponseHelper");
const router = express_1.default.Router();
const upload = (() => {
    const storage = multer_1.default.diskStorage({
        filename(req, file, cd) {
            const time = (+new Date()).toString(36);
            const extname = path_1.default.extname(file.fieldname);
            cd(null, `${time}${extname}`);
        }
    });
    return multer_1.default({
        storage,
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter(req, file, cd) {
            const ext = path_1.default.extname(file.originalname);
            const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
            if (allowedExtensions.includes(ext)) {
                cd(null, true);
            }
            else {
                cd(new Error("不支持此类型的文件上传"));
            }
        },
        dest: path_1.default.resolve(__dirname, "../../public/upload")
    }).single("imgfile");
})();
router.post("/", (req, res) => {
    upload(req, res, err => {
        if (err) {
            ResponseHelper_1.ResponseHelper.sendError(res, err.message);
        }
        else {
            ResponseHelper_1.ResponseHelper.sendData(res, req.file);
        }
    });
});
exports.default = router;
