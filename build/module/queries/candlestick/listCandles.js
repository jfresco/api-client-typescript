import gql from 'graphql-tag';
import { CANDLE_FRAGMENT } from './fragments/candleFragment';
export const LIST_CANDLES = gql `
  query listCandles(
    $before: DateTime
    $interval: CandleInterval
    $marketName: MarketName!
    $limit: Int
  ) {
    listCandles(
      before: $before
      interval: $interval
      marketName: $marketName
      limit: $limit
    ) {
      candles {
        ...candleFields
      }
    }
  }
  ${CANDLE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdENhbmRsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9jYW5kbGVzdGljay9saXN0Q2FuZGxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBRTVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCM0IsZUFBZTtDQUNsQixDQUFBIn0=