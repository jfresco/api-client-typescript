"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_ORDERBOOK = graphql_tag_1.default `
  query GetOrderBook($marketName: MarketName!) {
    getOrderBook(marketName: $marketName) {
      ...marketOrderbookFields
    }
  }
  ${fragments_1.ORDERBOOK_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJCb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldE9yZGVyQm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUM3QiwyQ0FBZ0Q7QUFFbkMsUUFBQSxhQUFhLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0lBTTVCLDhCQUFrQjtDQUNyQixDQUFBIn0=