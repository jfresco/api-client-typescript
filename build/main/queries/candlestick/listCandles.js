"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const candleFragment_1 = require("./fragments/candleFragment");
exports.LIST_CANDLES = graphql_tag_1.default `
  query listCandles(
    $before: DateTime
    $interval: CandleInterval
    $marketName: MarketName!
    $limit: Int
  ) {
    listCandles(
      before: $before
      interval: $interval
      marketName: $marketName
      limit: $limit
    ) {
      candles {
        ...candleFields
      }
    }
  }
  ${candleFragment_1.CANDLE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdENhbmRsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9jYW5kbGVzdGljay9saXN0Q2FuZGxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QiwrREFBNEQ7QUFFL0MsUUFBQSxZQUFZLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0IzQixnQ0FBZTtDQUNsQixDQUFBIn0=