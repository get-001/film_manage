import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export abstract class BaseEntity {
  /**
   * 验证当前对象
   * @returns {Promise<string[]>}
   * @memberof Movie
   */
  public async validataThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipUndefinedProperties: skipMissing
    });
    const temp = errors.map(e => Object.values(e.constraints));
    const result: string[] = [];
    temp.forEach(t => result.push(...t));
    return result;
  }

  /**
   * 将一个平面对象转化为某个类的对象
   * @static
   * @template T
   * @param {new (...args: any) => T} cls 目标对象
   * @param {object} plainObject 平面对象
   * @returns {T}
   * @memberof BaseEntity
   */
  public static transform<T>(
    cls: new (...args: any) => T,
    plainObject: object
  ): T {
    if (plainObject instanceof cls) {
      return plainObject;
    } else {
      // plainToClass -- 将plain Object转换为T的对象。
      return plainToClass(cls, plainObject);
    }
  }
}
