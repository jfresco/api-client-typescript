import gql from 'graphql-tag';
import { ASSET_FRAGMENT } from '../../asset/fragments';
export const ACCOUNT_PORTFOLIO_BALANCE_FRAGMENT = gql `
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
  ${ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFBvcnRmb2xpb0JhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2ZyYWdtZW50cy9hY2NvdW50UG9ydGZvbGlvQmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRXRELE1BQU0sQ0FBQyxNQUFNLGtDQUFrQyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztJQWFqRCxjQUFjO0NBQ2pCLENBQUEifQ==