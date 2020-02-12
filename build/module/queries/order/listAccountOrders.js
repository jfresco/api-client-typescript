import gql from 'graphql-tag';
import { ORDER_FRAGMENT } from './fragments';
import { TRADE_FRAGMENT } from '../market/fragments';
export const LIST_ACCOUNT_ORDERS = gql `
  query ListAccountOrders(
    $payload: ListAccountOrdersParams!
    $signature: Signature
  ) {
    listAccountOrders(payload: $payload, signature: $signature)
      @connection(key: "listAccountOrders") {
      next
      orders {
        ...orderFields
      }
    }
  }
  ${ORDER_FRAGMENT}
`;
export const LIST_ACCOUNT_ORDERS_WITH_TRADES = gql `
  query ListAccountOrders(
    $payload: ListAccountOrdersParams!
    $signature: Signature
  ) {
    listAccountOrders(payload: $payload, signature: $signature)
      @connection(key: "listAccountOrders") {
      next
      orders {
        ...orderFields
        trades {
          ...tradeFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${TRADE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRPcmRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9vcmRlci9saXN0QWNjb3VudE9yZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFcEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0lBYWxDLGNBQWM7Q0FDakIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWdCOUMsY0FBYztJQUNkLGNBQWM7Q0FDakIsQ0FBQSJ9