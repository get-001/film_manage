import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
  @IsInt({ message: "页码必须为整数类型" })
  @Min(1, { message: "页码最小值为1" })
  @Type(() => Number)
  public page: number = 1;
  @IsInt({ message: "页容量必须为整数类型" })
  @Min(1, { message: "页容量最小值为1" })
  @Type(() => Number)
  public limit: number = 10;
  @Type(() => String)
  public key: string = "";
}
