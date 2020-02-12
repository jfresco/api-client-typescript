"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_TRADES = graphql_tag_1.default `
  query ListTrades($marketName: MarketName!, $limit: Int, $before: DateTime) {
    listTrades(marketName: $marketName, limit: $limit, before: $before) {
      trades {
        ...tradeFields
      }
      next
    }
  }
  ${fragments_1.TRADE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFRyYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21hcmtldC9saXN0VHJhZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLDJDQUE0QztBQUUvQixRQUFBLFdBQVcsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7SUFTMUIsMEJBQWM7Q0FDakIsQ0FBQSJ9