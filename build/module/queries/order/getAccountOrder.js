import gql from 'graphql-tag';
import { ORDER_FRAGMENT } from './fragments';
export const GET_ACCOUNT_ORDER = gql `
  query GetAccountOrder(
    $payload: GetAccountOrderParams!
    $signature: Signature
  ) {
    getAccountOrder(payload: $payload, signature: $signature)
      @connection(key: "getAccountOrder") {
      ...orderFields
    }
  }
  ${ORDER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWNjb3VudE9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvb3JkZXIvZ2V0QWNjb3VudE9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRTVDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7OztJQVVoQyxjQUFjO0NBQ2pCLENBQUEifQ==