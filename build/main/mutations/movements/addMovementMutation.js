"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const index_1 = require("./fragments/index");
exports.ADD_MOVEMENT_MUTATION = graphql_tag_1.default `
  mutation addMovement($payload: AddMovementParams!, $signature: Signature!) {
    addMovement(payload: $payload, signature: $signature) {
      ...addMovementFields
    }
  }
  ${index_1.ADD_MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkTW92ZW1lbnRNdXRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvbW92ZW1lbnRzL2FkZE1vdmVtZW50TXV0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsNkNBQXlEO0FBRTVDLFFBQUEscUJBQXFCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0lBTXBDLDZCQUFxQjtDQUN4QixDQUFBIn0=