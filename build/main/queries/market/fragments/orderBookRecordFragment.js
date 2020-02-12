"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../currency/fragments");
exports.ORDERBOOK_RECORD_FRAGMENT = graphql_tag_1.default `
  fragment marketOrderbookRecordFields on OrderBookRecord {
    amount {
      ...currencyAmountFields
    }
    price {
      ...currencyPriceFields
    }
  }
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
  ${fragments_1.CURRENCY_PRICE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJCb29rUmVjb3JkRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL29yZGVyQm9va1JlY29yZEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBQzdCLHdEQUdpQztBQUVwQixRQUFBLHlCQUF5QixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7OztJQVN4QyxvQ0FBd0I7SUFDeEIsbUNBQXVCO0NBQzFCLENBQUEifQ==