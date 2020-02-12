import gql from 'graphql-tag';
import { TICKER_FRAGMENT } from './fragments';
export const GET_TICKER = gql `
  query GetTicker($marketName: MarketName!) {
    getTicker(marketName: $marketName) {
      ...tickerFields
    }
  }
  ${TICKER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldFRpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUU3QyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFBOzs7Ozs7SUFNekIsZUFBZTtDQUNsQixDQUFBIn0=