import gql from 'graphql-tag';
import { ORDER_PLACED_FRAGMENT } from './fragments';
export const PLACE_MARKET_ORDER_MUTATION = gql `
  mutation placeMarketOrder(
    $payload: PlaceMarketOrderParams!
    $signature: Signature!
  ) {
    placeMarketOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VNYXJrZXRPcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvb3JkZXJzL3BsYWNlTWFya2V0T3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVuRCxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztJQVMxQyxxQkFBcUI7Q0FDeEIsQ0FBQSJ9