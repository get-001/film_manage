import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";
const app = Express();
app.use(Express.json());
app.listen(8080);
app.use("/api/movie", MovieRouter);
app.use("/api/upload", UploadRouter);
app.use("/upload", Express.static("public/upload")); // 静态路径映射

// postman -- 测试工具
// express中间件：multer 用于处理上传的文件

// 数据库驱动：mongodb(官方)、mongoose(第三方)  两个对ts支持都不太好
// 其他的数据库驱动：typeorm (完全使用ts编写，基于类)，对mongodb支持不好，对其他关系型数据库支持比较友好(mySql)

// import { MovieService } from "./services/MovieService";

// const m: any = {
//   name: "流浪地球2",
//   types: ["喜剧", "动作", 11111],
//   areas: ["中国大陆", 11111],
//   timeLong: "48545",
//   isHot: true,
//   isClassic: false
// };
// MovieService.add(m).then(result => {
//   if (Array.isArray(result)) {
//     console.log(result);
//   } else {
//     console.log(result);
//   }
// });

// (async () => {
//   // const mE: any = { name: "流浪地球2" };
//   // let result: any = await MovieService.edit("5e7f7cd8f7a82e2a40b7d7f2", mE);
//   // console.log(result);
//   // result = await MovieService.delete("5e7f7cd8f7a82e2a40b7d7f2");
//   // console.log(result);
//   // result = await MovieService.findById("5e7f7cd8f7a82e2a40b7d7f2");

//   const condi: any = { page: 1, limit: 5, key: "流浪" };
//   const result = await MovieService.find(condi);
//   console.log(result.count, Object.values(result.data.map(it => it.name)));
// })();
