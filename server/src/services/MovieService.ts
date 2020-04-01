import { Movie } from "../entities/Movie";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult, IMovie } from "../entities/CommonTypes";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1.转换对象
    movie = Movie.transform(Movie, movie);
    // 2.数据验证
    const errors = await movie.validataThis();
    if (errors.length > 0) return errors; // 验证不通过
    // 3.添加到数据库
    return await MovieModel.create(movie); // 添加到数据库后，返回带ID的movie
  }
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1.转换对象
    movie = Movie.transform(Movie, movie);
    // 2.数据验证
    const errors = await movie.validataThis(true);
    if (errors.length > 0) return errors; // 验证不通过
    // 3.修改数据库
    return await MovieModel.updateOne({ _id: id }, movie); // 增量修改
    // return errors;
  }
  public static async delete(id: string) {
    return await MovieModel.deleteOne({ _id: id }); // 通过id删除
  }
  public static async findById(id: string): Promise<Movie | null> {
    return MovieModel.findById(id); // 通过id查询
  }

  /**
   * 按照页码批量查询
   * @static
   * @param {SearchCondition} condition
   * @returns {(Promise<Movie[] | string[]>)}
   * @memberof MovieService
   */
  public static async find(
    condition: SearchCondition
  ): Promise<ISearchResult<IMovie>> {
    // 1.转换对象
    condition = SearchCondition.transform(SearchCondition, condition);
    // 2.数据验证
    const errors = await condition.validataThis();
    if (errors.length > 0) return { count: 0, data: [], errors }; // 验证不通过
    // 3.模糊查询
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(condition.key) }
    })
      .skip((condition.page - 1) * condition.limit)
      .limit(condition.limit);
    const count = await MovieModel.find({
      name: { $regex: new RegExp(condition.key) }
    }).countDocuments();
    return { count, data: movies, errors: [] };
  }
}
