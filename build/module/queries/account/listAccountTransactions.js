import gql from 'graphql-tag';
import { ACCOUNT_TRANSACTION_FRAGMENT } from './fragments/accountTransaction';
export const LIST_ACCOUNT_TRANSACTIONS = gql `
  query listAccountTransactions(
    $payload: ListAccountTransactionsParams!
    $signature: Signature!
  ) {
    listAccountTransactions(payload: $payload, signature: $signature)
      @connection(key: "listAccountTransactions") {
      nextCursor
      transactions {
        ...accountTransactionFields
      }
    }
  }
  ${ACCOUNT_TRANSACTION_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRUcmFuc2FjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2xpc3RBY2NvdW50VHJhbnNhY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUU3RSxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7SUFheEMsNEJBQTRCO0NBQy9CLENBQUEifQ==