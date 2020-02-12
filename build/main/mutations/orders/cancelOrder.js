"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../orders/fragments");
exports.CANCEL_ORDER_MUTATION = graphql_tag_1.default `
  mutation cancelOrder($payload: CancelOrderParams!, $signature: Signature!) {
    cancelOrder(payload: $payload, signature: $signature) {
      ...canceledOrderFields
    }
  }
  ${fragments_1.CANCELED_ORDER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsT3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXV0YXRpb25zL29yZGVycy9jYW5jZWxPcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QixtREFBNkQ7QUFFaEQsUUFBQSxxQkFBcUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7SUFNcEMsbUNBQXVCO0NBQzFCLENBQUEifQ==