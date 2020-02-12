import gql from 'graphql-tag';
import { ORDERBOOK_FRAGMENT } from './fragments';
export const GET_ORDERBOOK = gql `
  query GetOrderBook($marketName: MarketName!) {
    getOrderBook(marketName: $marketName) {
      ...marketOrderbookFields
    }
  }
  ${ORDERBOOK_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJCb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbWFya2V0L2dldE9yZGVyQm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFDN0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUE7Ozs7OztJQU01QixrQkFBa0I7Q0FDckIsQ0FBQSJ9