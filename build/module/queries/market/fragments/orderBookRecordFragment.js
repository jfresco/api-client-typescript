import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT, CURRENCY_PRICE_FRAGMENT } from '../../currency/fragments';
export const ORDERBOOK_RECORD_FRAGMENT = gql `
  fragment marketOrderbookRecordFields on OrderBookRecord {
    amount {
      ...currencyAmountFields
    }
    price {
      ...currencyPriceFields
    }
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
  ${CURRENCY_PRICE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJCb29rUmVjb3JkRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL29yZGVyQm9va1JlY29yZEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUM3QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN4QixNQUFNLDBCQUEwQixDQUFBO0FBRWpDLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7O0lBU3hDLHdCQUF3QjtJQUN4Qix1QkFBdUI7Q0FDMUIsQ0FBQSJ9