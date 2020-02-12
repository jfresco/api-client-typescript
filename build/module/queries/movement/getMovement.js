import gql from 'graphql-tag';
import { MOVEMENT_FRAGMENT } from './fragments';
export const GET_MOVEMENT = gql `
  query getMovement($payload: GetMovementParams!, $signature: Signature) {
    getMovement(payload: $payload, signature: $signature) {
      ...movementFields
    }
  }
  ${MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TW92ZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tb3ZlbWVudC9nZXRNb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRS9DLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7OztJQU0zQixpQkFBaUI7Q0FDcEIsQ0FBQSJ9