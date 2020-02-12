"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../asset/fragments");
exports.ACCOUNT_PORTFOLIO_BALANCE_FRAGMENT = graphql_tag_1.default `
  fragment portfolioBalanceFields on AccountPortfolioBalance {
    allocation
    asset {
      ...assetFields
    }
    fiatPrice
    fiatPriceChange
    fiatPriceChangePercent
    total
    totalFiatPrice
    totalFiatPriceChange
  }
  ${fragments_1.ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFBvcnRmb2xpb0JhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2ZyYWdtZW50cy9hY2NvdW50UG9ydGZvbGlvQmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3QixxREFBc0Q7QUFFekMsUUFBQSxrQ0FBa0MsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0lBYWpELDBCQUFjO0NBQ2pCLENBQUEifQ==