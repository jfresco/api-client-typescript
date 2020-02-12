import gql from 'graphql-tag';
import { CONFIRMATIONS_FRAGMENT } from './confirmations';
import { CURRENCY_AMOUNT_FRAGMENT } from '../../currency/fragments';
export const ACCOUNT_TRANSACTION_FRAGMENT = gql `
  fragment accountTransactionFields on AccountTransaction {
    address
    blockDatetime
    blockIndex
    blockchain
    confirmations {
      ...confirmationsFields
    }
    fiatValue
    status
    txid
    type
    value {
      ...currencyAmountFields
    }
  }
  ${CONFIRMATIONS_FRAGMENT}
  ${CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFRyYW5zYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9mcmFnbWVudHMvYWNjb3VudFRyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVuRSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUIzQyxzQkFBc0I7SUFDdEIsd0JBQXdCO0NBQzNCLENBQUEifQ==