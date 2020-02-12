"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_TICKER = graphql_tag_1.default `
  query GetTicker($marketName: MarketName!) {
    getTicker(marketName: $marketName) {
      ...tickerFields
    }
  }
  ${fragments_1.TICKER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldFRpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwyQ0FBNkM7QUFFaEMsUUFBQSxVQUFVLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0lBTXpCLDJCQUFlO0NBQ2xCLENBQUEifQ==