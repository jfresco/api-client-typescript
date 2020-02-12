import gql from 'graphql-tag';
import { ACCOUNT_BALANCE_FRAGMENT } from './fragments';
export const GET_ACCOUNT_BALANCE = gql `
  query getAccountBalance(
    $payload: GetAccountBalanceParams!
    $signature: Signature
  ) {
    getAccountBalance(payload: $payload, signature: $signature)
      @connection(key: "getAccountBalance") {
      ...accountBalanceFields
    }
  }
  ${ACCOUNT_BALANCE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWNjb3VudEJhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2dldEFjY291bnRCYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFdEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O0lBVWxDLHdCQUF3QjtDQUMzQixDQUFBIn0=