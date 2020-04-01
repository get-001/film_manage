import "reflect-metadata";
import {
  IsNotEmpty,
  ArrayMinSize,
  IsInt,
  Min,
  Max,
  IsArray
} from "class-validator";
import { Type, plainToClass } from "class-transformer";
import { BaseEntity } from "./BaseEntity";
export class Movie extends BaseEntity {
  @IsNotEmpty({ message: "电影名称不能为空" })
  @Type(() => String)
  public name: string;
  @IsNotEmpty({ message: "电影类型不能为空" })
  @ArrayMinSize(1, { message: "电影类型成员至少有一个" })
  @IsArray({ message: "电影类型必须为数组" })
  @Type(() => String)
  public types: string[];
  @IsNotEmpty({ message: "上映地区不能为空" })
  @ArrayMinSize(1, { message: "上映地区成员至少有一个" })
  @IsArray({ message: "上映地区必须为数组" })
  @Type(() => String)
  public areas: string[];
  @IsNotEmpty({ message: "时长不能为空" })
  @IsInt({ message: "时长必须为整数" })
  @Min(1, { message: "时长至少一分钟" })
  @Max(999999, { message: "时长已达到上限" })
  @Type(() => Number)
  public timeLong: number;
  @IsNotEmpty({ message: "是否热映不能为空" })
  @Type(() => Boolean)
  public isHot: boolean;
  @IsNotEmpty({ message: "是否即将上映不能为空" })
  @Type(() => Boolean)
  public isClassic: boolean;
  @Type(() => String)
  public description?: string;
  @Type(() => String)
  public poster?: string;
}
