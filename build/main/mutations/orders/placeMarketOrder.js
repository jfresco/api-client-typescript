"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.PLACE_MARKET_ORDER_MUTATION = graphql_tag_1.default `
  mutation placeMarketOrder(
    $payload: PlaceMarketOrderParams!
    $signature: Signature!
  ) {
    placeMarketOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${fragments_1.ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VNYXJrZXRPcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvb3JkZXJzL3BsYWNlTWFya2V0T3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsMkNBQW1EO0FBRXRDLFFBQUEsMkJBQTJCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7O0lBUzFDLGlDQUFxQjtDQUN4QixDQUFBIn0=