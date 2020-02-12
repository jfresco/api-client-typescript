import gql from 'graphql-tag';
import { ORDER_PLACED_FRAGMENT } from './fragments';
export const PLACE_STOP_LIMIT_ORDER_MUTATION = gql `
  mutation placeStopLimitOrder(
    $payload: PlaceStopLimitOrderParams!
    $signature: Signature!
  ) {
    placeStopLimitOrder(payload: $payload, signature: $signature) {
      ...orderPlacedFields
    }
  }
  ${ORDER_PLACED_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VTdG9wTGltaXRPcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvb3JkZXJzL3BsYWNlU3RvcExpbWl0T3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVuRCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztJQVM5QyxxQkFBcUI7Q0FDeEIsQ0FBQSJ9