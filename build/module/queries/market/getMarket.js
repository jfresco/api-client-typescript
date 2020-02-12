import gql from 'graphql-tag';
import { MARKET_FRAGMENT } from './fragments';
export const GET_MARKET_QUERY = gql `
  query GetMarket($marketName: MarketName!) {
    getMarket(marketName: $marketName) {
      ...marketFields
    }
  }
  ${MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldE1hcmtldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUU3QyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUE7Ozs7OztJQU0vQixlQUFlO0NBQ2xCLENBQUEifQ==