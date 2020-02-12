"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_ACCOUNT_ORDER = graphql_tag_1.default `
  query GetAccountOrder(
    $payload: GetAccountOrderParams!
    $signature: Signature
  ) {
    getAccountOrder(payload: $payload, signature: $signature)
      @connection(key: "getAccountOrder") {
      ...orderFields
    }
  }
  ${fragments_1.ORDER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWNjb3VudE9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvb3JkZXIvZ2V0QWNjb3VudE9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLDJDQUE0QztBQUUvQixRQUFBLGlCQUFpQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7SUFVaEMsMEJBQWM7Q0FDakIsQ0FBQSJ9