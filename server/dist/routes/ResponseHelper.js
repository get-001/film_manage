"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
  static sendError(res, error) {
    let err;
    if (Array.isArray(error)) {
      err = error.join(";");
    } else {
      err = error;
    }
    res.send({ err, data: null });
  }
  static sendData(res, data) {
    res.send({ err: "", data });
  }
  static sendPageData(res, result) {
    if (result.errors.length > 0) {
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
exports.ResponseHelper = ResponseHelper;
