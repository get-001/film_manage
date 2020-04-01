import path from "path";
import Express from "express";
import multer from "multer";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();
const upload = (() => {
  const storage = multer.diskStorage({
    filename(req, file, cd) {
      // 配置上传后的文件名
      const time = (+new Date()).toString(36);
      const extname = path.extname(file.fieldname);
      cd(null, `${time}${extname}`);
    }
  });
  return multer({
    // storage -- 包括文件名、路径等多个配置项
    storage,
    // limits -- 包括字段、文件等多个配置项
    limits: {
      fileSize: 1024 * 1024 * 2 /*限制文件大小(2MB)*/
    },
    fileFilter(req, file, cd) {
      // 拦截器，限制文件类型
      const ext = path.extname(file.originalname);
      const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
      if (allowedExtensions.includes(ext)) {
        cd(null, true);
      } else {
        cd(new Error("不支持此类型的文件上传"));
      }
    },
    // dest -- 文件存储的位置
    dest: path.resolve(__dirname, "../../public/upload")
  }).single("imgfile");
})();

router.post("/", (req, res) => {
  upload(req, res, err => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(res, err.message);
    } else {
      // 一切都好
      ResponseHelper.sendData(res, req.file);
    }
  });
});

export default router;
