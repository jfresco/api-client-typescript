import gql from 'graphql-tag';
import { TRADE_FRAGMENT } from './fragments';
export const LIST_TRADES = gql `
  query ListTrades($marketName: MarketName!, $limit: Int, $before: DateTime) {
    listTrades(marketName: $marketName, limit: $limit, before: $before) {
      trades {
        ...tradeFields
      }
      next
    }
  }
  ${TRADE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFRyYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21hcmtldC9saXN0VHJhZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRTVDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztJQVMxQixjQUFjO0NBQ2pCLENBQUEifQ==