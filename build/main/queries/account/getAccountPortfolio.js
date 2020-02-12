"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_ACCOUNT_PORTFOLIO = graphql_tag_1.default `
  query getAccountPortfolio(
    $payload: GetAccountPortfolioParams!
    $signature: Signature!
  ) {
    getAccountPortfolio(payload: $payload, signature: $signature)
      @connection(key: "getAccountPortfolio") {
      balances {
        ...portfolioBalanceFields
      }
      graph {
        ...graphPointFields
      }
      total {
        ...accountPortfolioTotalFields
      }
    }
  }
  ${fragments_1.ACCOUNT_PORTFOLIO_BALANCE_FRAGMENT}
  ${fragments_1.GRAPH_POINT_FRAGMENT}
  ${fragments_1.ACCOUNT_PORTFOLIO_TOTAL_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWNjb3VudFBvcnRmb2xpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL2FjY291bnQvZ2V0QWNjb3VudFBvcnRmb2xpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwyQ0FJb0I7QUFFUCxRQUFBLHFCQUFxQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCcEMsOENBQWtDO0lBQ2xDLGdDQUFvQjtJQUNwQiw0Q0FBZ0M7Q0FDbkMsQ0FBQSJ9