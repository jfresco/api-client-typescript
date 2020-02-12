import gql from 'graphql-tag';
import { ORDER_PLACED_FRAGMENT } from './fragments/index';
export const PLACE_STOP_MARKET_ORDER_MUTATION = gql `
  mutation placeStopMarketOrder(
    $payload: PlaceStopMarketOrderParams!
    $signature: Signature!
  ) {
    placeStopMarketOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VTdG9wTWFya2V0T3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXV0YXRpb25zL29yZGVycy9wbGFjZVN0b3BNYXJrZXRPcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFekQsTUFBTSxDQUFDLE1BQU0sZ0NBQWdDLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7SUFTL0MscUJBQXFCO0NBQ3hCLENBQUEifQ==