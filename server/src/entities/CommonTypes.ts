import { Document } from "mongoose";
import { Movie } from "./Movie";

export interface IMovie extends Movie, Document {}

export interface ISearchResult<T> {
  count: number; // 数据总数
  data: T[]; // 查询的数据
  errors: string[]; // 查询的错误
}
