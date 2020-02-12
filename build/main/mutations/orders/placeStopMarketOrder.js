"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const index_1 = require("./fragments/index");
exports.PLACE_STOP_MARKET_ORDER_MUTATION = graphql_tag_1.default `
  mutation placeStopMarketOrder(
    $payload: PlaceStopMarketOrderParams!
    $signature: Signature!
  ) {
    placeStopMarketOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${index_1.ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VTdG9wTWFya2V0T3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXV0YXRpb25zL29yZGVycy9wbGFjZVN0b3BNYXJrZXRPcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3Qiw2Q0FBeUQ7QUFFNUMsUUFBQSxnQ0FBZ0MsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7SUFTL0MsNkJBQXFCO0NBQ3hCLENBQUEifQ==