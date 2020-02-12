"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../currency/fragments");
const marketFragment_1 = require("./marketFragment");
exports.TICKER_FRAGMENT = graphql_tag_1.default `
  fragment tickerFields on Ticker {
    market {
      ...marketFields
    }
    priceChange24hPct
    volume24h {
      ...currencyAmountFields
    }
    lastPrice {
      ...currencyPriceFields
    }
    usdLastPrice {
      ...currencyPriceFields
    }
  }
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
  ${fragments_1.CURRENCY_PRICE_FRAGMENT}
  ${marketFragment_1.MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2VyRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL3RpY2tlckZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLHdEQUdpQztBQUNqQyxxREFBa0Q7QUFFckMsUUFBQSxlQUFlLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWdCOUIsb0NBQXdCO0lBQ3hCLG1DQUF1QjtJQUN2QixnQ0FBZTtDQUNsQixDQUFBIn0=