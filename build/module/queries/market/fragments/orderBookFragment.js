import gql from 'graphql-tag';
import { ORDERBOOK_RECORD_FRAGMENT } from './orderBookRecordFragment';
export const ORDERBOOK_FRAGMENT = gql `
  fragment marketOrderbookFields on OrderBook {
    asks {
      ...marketOrderbookRecordFields
    }
    bids {
      ...marketOrderbookRecordFields
    }
  }
  ${ORDERBOOK_RECORD_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJCb29rRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL29yZGVyQm9va0ZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUVyRSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztJQVNqQyx5QkFBeUI7Q0FDNUIsQ0FBQSJ9