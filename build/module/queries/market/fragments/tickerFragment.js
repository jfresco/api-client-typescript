import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT, CURRENCY_PRICE_FRAGMENT } from '../../currency/fragments';
import { MARKET_FRAGMENT } from './marketFragment';
export const TICKER_FRAGMENT = gql `
  fragment tickerFields on Ticker {
    market {
      ...marketFields
    }
    priceChange24hPct
    volume24h {
      ...currencyAmountFields
    }
    lastPrice {
      ...currencyPriceFields
    }
    usdLastPrice {
      ...currencyPriceFields
    }
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
  ${CURRENCY_PRICE_FRAGMENT}
  ${MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2VyRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL3RpY2tlckZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN4QixNQUFNLDBCQUEwQixDQUFBO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUVsRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0I5Qix3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLGVBQWU7Q0FDbEIsQ0FBQSJ9