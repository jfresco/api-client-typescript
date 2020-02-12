"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const currencyAmountFragment_1 = require("./currencyAmountFragment");
const currencyPriceFragment_1 = require("./currencyPriceFragment");
exports.CANDLE_FRAGMENT = graphql_tag_1.default `
  fragment candleFields on Candle {
    aVolume {
      ...currencyAmountPartialFields
    }
    closePrice {
      ...currencyPricePartialFields
    }
    highPrice {
      ...currencyPricePartialFields
    }
    interval
    intervalStartingAt
    lowPrice {
      ...currencyPricePartialFields
    }
    openPrice {
      ...currencyPricePartialFields
    }
  }
  ${currencyAmountFragment_1.CURRENCY_AMOUNT_PARTIAL_FRAGMENT}
  ${currencyPriceFragment_1.CURRENCY_PRICE_PARTIAL_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuZGxlRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9jYW5kbGVzdGljay9mcmFnbWVudHMvY2FuZGxlRnJhZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IscUVBQTJFO0FBRTNFLG1FQUF5RTtBQUU1RCxRQUFBLGVBQWUsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9COUIseURBQWdDO0lBQ2hDLHVEQUErQjtDQUNsQyxDQUFBIn0=