"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.CURRENCY_PRICE_FRAGMENT = graphql_tag_1.default `
  fragment currencyPriceFields on CurrencyPrice {
    amount
    currencyA
    currencyB
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3lQcmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL2N1cnJlbmN5L2ZyYWdtZW50cy9jdXJyZW5jeVByaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRWhCLFFBQUEsdUJBQXVCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0NBTXpDLENBQUEifQ==