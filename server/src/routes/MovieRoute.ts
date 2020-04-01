import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

// 根据id查询单个
router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const result = await MovieService.findById(movieId);
    ResponseHelper.sendData(res, result);
  } catch (error) {
    ResponseHelper.sendError(res, "id有误");
  }
});

// 批量模糊查询
router.get("/", async (req, res) => {
  const result = await MovieService.find(req.query);
  ResponseHelper.sendPageData(res, result);
});

// 新增单个数据
router.post("/", async (req, res) => {
  const result = await MovieService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHelper.sendError(res, result);
  } else {
    ResponseHelper.sendData(res, result);
  }
});

// 根据id修改
router.put("/:id", async (req, res) => {
  try {
    const {
      params: { id },
      body: data
    } = req;
    const result = await MovieService.edit(id, data);
    if (result.length > 0) {
      ResponseHelper.sendError(res, result);
    } else {
      ResponseHelper.sendData(res, result);
    }
  } catch (error) {
    ResponseHelper.sendError(res, "id有误");
  }
});

// 根据id删除
router.delete("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const result = await MovieService.delete(movieId);
    ResponseHelper.sendData(res, result);
  } catch (error) {
    ResponseHelper.sendError(res, "id有误");
  }
});

export default router;
