import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_PARTIAL_FRAGMENT } from './currencyAmountFragment';
import { CURRENCY_PRICE_PARTIAL_FRAGMENT } from './currencyPriceFragment';
export const CANDLE_FRAGMENT = gql `
  fragment candleFields on Candle {
    aVolume {
      ...currencyAmountPartialFields
    }
    closePrice {
      ...currencyPricePartialFields
    }
    highPrice {
      ...currencyPricePartialFields
    }
    interval
    intervalStartingAt
    lowPrice {
      ...currencyPricePartialFields
    }
    openPrice {
      ...currencyPricePartialFields
    }
  }
  ${CURRENCY_AMOUNT_PARTIAL_FRAGMENT}
  ${CURRENCY_PRICE_PARTIAL_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuZGxlRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9jYW5kbGVzdGljay9mcmFnbWVudHMvY2FuZGxlRnJhZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBRTNFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBRXpFLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0I5QixnQ0FBZ0M7SUFDaEMsK0JBQStCO0NBQ2xDLENBQUEifQ==