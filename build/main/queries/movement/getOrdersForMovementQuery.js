"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.GET_ORDERS_FOR_MOVEMENT_QUERY = graphql_tag_1.default `
  query getOrdersForMovement(
    $payload: GetOrdersForMovementParams!
    $signature: Signature!
  ) {
    getOrdersForMovement(payload: $payload, signature: $signature) {
      recycledOrders {
        blockchain
        message
      }
      assetNonce
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJzRm9yTW92ZW1lbnRRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2dldE9yZGVyc0Zvck1vdmVtZW50UXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFJaEIsUUFBQSw2QkFBNkIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0NBYS9DLENBQUEifQ==