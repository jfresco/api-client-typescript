import gql from 'graphql-tag';
import { TRADE_FRAGMENT } from '../market/fragments';
export const LIST_ACCOUNT_TRADES = gql `
  query ListAccountTrades(
    $payload: ListAccountTradesParams!
    $signature: Signature
  ) {
    listAccountTrades(payload: $payload, signature: $signature)
      @connection(key: "listAccountTrades") {
      next
      trades {
        ...tradeFields
      }
    }
  }
  ${TRADE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRUcmFkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy90cmFkZS9saXN0QWNjb3VudFRyYWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBRXBELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztJQWFsQyxjQUFjO0NBQ2pCLENBQUEifQ==