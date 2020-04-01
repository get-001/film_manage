"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const BaseEntity_1 = require("./BaseEntity");
class SearchCondition extends BaseEntity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.page = 1;
        this.limit = 10;
        this.key = "";
    }
}
__decorate([
    class_validator_1.IsInt({ message: "页码必须为整数类型" }),
    class_validator_1.Min(1, { message: "页码最小值为1" }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], SearchCondition.prototype, "page", void 0);
__decorate([
    class_validator_1.IsInt({ message: "页容量必须为整数类型" }),
    class_validator_1.Min(1, { message: "页容量最小值为1" }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], SearchCondition.prototype, "limit", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], SearchCondition.prototype, "key", void 0);
exports.SearchCondition = SearchCondition;
