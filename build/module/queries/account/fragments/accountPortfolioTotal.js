import gql from 'graphql-tag';
export const ACCOUNT_PORTFOLIO_TOTAL_FRAGMENT = gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFBvcnRmb2xpb1RvdGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9mcmFnbWVudHMvYWNjb3VudFBvcnRmb2xpb1RvdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixNQUFNLENBQUMsTUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQmxELENBQUEifQ==