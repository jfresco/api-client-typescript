"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_MARKET_QUERY = graphql_tag_1.default `
  query GetMarket($marketName: MarketName!) {
    getMarket(marketName: $marketName) {
      ...marketFields
    }
  }
  ${fragments_1.MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldE1hcmtldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwyQ0FBNkM7QUFFaEMsUUFBQSxnQkFBZ0IsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7SUFNL0IsMkJBQWU7Q0FDbEIsQ0FBQSJ9