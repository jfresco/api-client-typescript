"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_MOVEMENT = graphql_tag_1.default `
  query getMovement($payload: GetMovementParams!, $signature: Signature) {
    getMovement(payload: $payload, signature: $signature) {
      ...movementFields
    }
  }
  ${fragments_1.MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TW92ZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tb3ZlbWVudC9nZXRNb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwyQ0FBK0M7QUFFbEMsUUFBQSxZQUFZLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0lBTTNCLDZCQUFpQjtDQUNwQixDQUFBIn0=