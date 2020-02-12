"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../market/fragments");
const fragments_2 = require("../../currency/fragments");
exports.ORDER_FRAGMENT = graphql_tag_1.default `
  fragment orderFields on Order {
    amount {
      ...currencyAmountFields
    }
    amountRemaining {
      ...currencyAmountFields
    }
    buyOrSell
    cancelAt
    cancellationPolicy
    id
    limitPrice {
      ...currencyPriceFields
    }
    market {
      ...marketFields
    }
    placedAt
    status
    stopPrice {
      ...currencyPriceFields
    }
    type
  }
  ${fragments_2.CURRENCY_PRICE_FRAGMENT}
  ${fragments_2.CURRENCY_AMOUNT_FRAGMENT}
  ${fragments_1.MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL29yZGVyL2ZyYWdtZW50cy9vcmRlckZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBQzdCLHNEQUF3RDtBQUN4RCx3REFHaUM7QUFFcEIsUUFBQSxjQUFjLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlCN0IsbUNBQXVCO0lBQ3ZCLG9DQUF3QjtJQUN4QiwyQkFBZTtDQUNsQixDQUFBIn0=