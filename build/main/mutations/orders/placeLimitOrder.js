"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.PLACE_LIMIT_ORDER_MUTATION = graphql_tag_1.default `
  mutation placeLimitOrder(
    $payload: PlaceLimitOrderParams!
    $signature: Signature!
  ) {
    placeLimitOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${fragments_1.ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VMaW1pdE9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9vcmRlcnMvcGxhY2VMaW1pdE9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLDJDQUFtRDtBQUV0QyxRQUFBLDBCQUEwQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7OztJQVN6QyxpQ0FBcUI7Q0FDeEIsQ0FBQSJ9