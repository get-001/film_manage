import Mongoose from "mongoose";
import { IMovie } from "../entities/CommonTypes";

const movieSchema = new Mongoose.Schema<IMovie>(
  {
    name: String,
    areas: [String],
    tyoes: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String
  },
  {
    versionKey: false
  }
);
export default Mongoose.model<IMovie>("Movie", movieSchema);
