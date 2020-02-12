"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../market/fragments");
exports.LIST_ACCOUNT_TRADES = graphql_tag_1.default `
  query ListAccountTrades(
    $payload: ListAccountTradesParams!
    $signature: Signature
  ) {
    listAccountTrades(payload: $payload, signature: $signature)
      @connection(key: "listAccountTrades") {
      next
      trades {
        ...tradeFields
      }
    }
  }
  ${fragments_1.TRADE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRUcmFkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy90cmFkZS9saXN0QWNjb3VudFRyYWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QixtREFBb0Q7QUFFdkMsUUFBQSxtQkFBbUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0lBYWxDLDBCQUFjO0NBQ2pCLENBQUEifQ==