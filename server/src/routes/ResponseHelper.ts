import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponseHelper {
  // 响应一个错误
  public static sendError(res: Response, error: string | string[]) {
    let err: string;
    if (Array.isArray(error)) {
      err = error.join(";");
    } else {
      err = error;
    }
    res.send({ err, data: null });
  }

  // 响应一个普通数据
  public static sendData(res: Response, data: any) {
    res.send({ err: "", data });
  }

  public static sendPageData<T>(res: Response, result: ISearchResult<T>) {
    if (result.errors.length > 0) {
      // 有错误
      this.sendError(res, result.errors);
    } else {
      res.send({
        err: "",
        data: result.data,
        total: result.count
      });
    }
  }
}
