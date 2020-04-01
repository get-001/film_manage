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
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("../entities/Movie");
const db_1 = require("../db");
const SearchCondition_1 = require("../entities/SearchCondition");
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(Movie_1.Movie, movie);
            const errors = yield movie.validataThis();
            if (errors.length > 0)
                return errors;
            return yield db_1.MovieModel.create(movie);
        });
    }
    static edit(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(Movie_1.Movie, movie);
            const errors = yield movie.validataThis(true);
            if (errors.length > 0)
                return errors;
            yield db_1.MovieModel.updateOne({ _id: id }, movie);
            return errors;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.MovieModel.deleteOne({ _id: id });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.MovieModel.findById(id);
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            condition = SearchCondition_1.SearchCondition.transform(SearchCondition_1.SearchCondition, condition);
            const errors = yield condition.validataThis();
            if (errors.length > 0)
                return { count: 0, data: [], errors };
            const movies = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(condition.key) }
            })
                .skip((condition.page - 1) * condition.limit)
                .limit(condition.limit);
            const count = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(condition.key) }
            }).countDocuments();
            return { count, data: movies, errors: [] };
        });
    }
}
exports.MovieService = MovieService;
