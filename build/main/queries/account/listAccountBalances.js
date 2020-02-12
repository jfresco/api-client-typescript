"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_ACCOUNT_BALANCES = graphql_tag_1.default `
  query listAccountBalances(
    $payload: ListAccountBalancesParams!
    $signature: Signature
  ) {
    listAccountBalances(payload: $payload, signature: $signature)
      @connection(key: "listAccountBalances") {
      ...accountBalanceFields
    }
  }
  ${fragments_1.ACCOUNT_BALANCE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRCYWxhbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL2FjY291bnQvbGlzdEFjY291bnRCYWxhbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwyQ0FBc0Q7QUFFekMsUUFBQSxxQkFBcUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7O0lBVXBDLG9DQUF3QjtDQUMzQixDQUFBIn0=