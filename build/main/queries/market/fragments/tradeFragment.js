"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../../queries/currency/fragments");
exports.TRADE_FRAGMENT = graphql_tag_1.default `
  fragment tradeFields on Trade {
    id
    makerOrderId
    takerOrderId
    executedAt
    accountSide
    limitPrice {
      ...currencyPriceFields
    }
    amount {
      ...currencyAmountFields
    }
    direction
    makerGave {
      ...currencyAmountFields
    }
    takerGave {
      ...currencyAmountFields
    }
    makerReceived {
      ...currencyAmountFields
    }
    takerReceived {
      ...currencyAmountFields
    }
    makerFee {
      ...currencyAmountFields
    }
    takerFee {
      ...currencyAmountFields
    }
  }
  ${fragments_1.CURRENCY_PRICE_FRAGMENT}
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGVGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21hcmtldC9mcmFnbWVudHMvdHJhZGVGcmFnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QixtRUFHNEM7QUFFL0IsUUFBQSxjQUFjLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUM3QixtQ0FBdUI7SUFDdkIsb0NBQXdCO0NBQzNCLENBQUEifQ==