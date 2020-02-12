"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.CANCEL_ALL_ORDERS_MUTATION = graphql_tag_1.default `
  mutation cancelAllOrders(
    $payload: CancelAllOrdersParams!
    $signature: Signature!
  ) {
    cancelAllOrders(payload: $payload, signature: $signature) {
      accepted
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsQWxsT3JkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9vcmRlcnMvY2FuY2VsQWxsT3JkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRWhCLFFBQUEsMEJBQTBCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7O0NBUzVDLENBQUEifQ==