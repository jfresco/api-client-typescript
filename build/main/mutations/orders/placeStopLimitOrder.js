"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.PLACE_STOP_LIMIT_ORDER_MUTATION = graphql_tag_1.default `
  mutation placeStopLimitOrder(
    $payload: PlaceStopLimitOrderParams!
    $signature: Signature!
  ) {
    placeStopLimitOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${fragments_1.ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VTdG9wTGltaXRPcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvb3JkZXJzL3BsYWNlU3RvcExpbWl0T3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsMkNBQW1EO0FBRXRDLFFBQUEsK0JBQStCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7O0lBUzlDLGlDQUFxQjtDQUN4QixDQUFBIn0=