"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.ACCOUNT_PORTFOLIO_TOTAL_FRAGMENT = graphql_tag_1.default `
  fragment accountPortfolioTotalFields on AccountPortfolioTotal {
    availableAllocation
    availableFiatPrice
    inOrdersAllocation
    inOrdersFiatPrice
    inStakesAllocation
    inStakesFiatPrice
    pendingAllocation
    pendingFiatPrice
    personalAllocation
    personalFiatPrice
    totalFiatPrice
    totalFiatPriceChange
    totalFiatPriceChangePercent
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFBvcnRmb2xpb1RvdGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9mcmFnbWVudHMvYWNjb3VudFBvcnRmb2xpb1RvdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRWhCLFFBQUEsZ0NBQWdDLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCbEQsQ0FBQSJ9