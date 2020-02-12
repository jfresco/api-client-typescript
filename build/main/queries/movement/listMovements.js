"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_MOVEMENTS = graphql_tag_1.default `
  query listMovements($payload: ListMovementsParams!, $signature: Signature) {
    listMovements(payload: $payload, signature: $signature) {
      ...movementFields
    }
  }
  ${fragments_1.MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE1vdmVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2xpc3RNb3ZlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsMkNBQStDO0FBRWxDLFFBQUEsY0FBYyxHQUFHLHFCQUFHLENBQUE7Ozs7OztJQU03Qiw2QkFBaUI7Q0FDcEIsQ0FBQSJ9