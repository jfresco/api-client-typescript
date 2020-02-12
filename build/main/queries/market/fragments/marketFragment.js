"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.MARKET_FRAGMENT = graphql_tag_1.default `
  fragment marketFields on Market {
    aUnit
    aUnitPrecision
    bUnit
    bUnitPrecision
    minTickSize
    minTradeSize
    minTradeSizeB
    minTradeIncrement
    minTradeIncrementB
    name
    status
    priceGranularity
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0RnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL21hcmtldEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRWhCLFFBQUEsZUFBZSxHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7OztDQWVqQyxDQUFBIn0=