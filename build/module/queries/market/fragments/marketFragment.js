import gql from 'graphql-tag';
export const MARKET_FRAGMENT = gql `
  fragment marketFields on Market {
    aUnit
    aUnitPrecision
    bUnit
    bUnitPrecision
    minTickSize
    minTradeSize
    minTradeSizeB
    minTradeIncrement
    minTradeIncrementB
    name
    status
    priceGranularity
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0RnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL21hcmtldEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Q0FlakMsQ0FBQSJ9