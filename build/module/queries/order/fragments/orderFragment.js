import gql from 'graphql-tag';
import { MARKET_FRAGMENT } from '../../market/fragments';
import { CURRENCY_AMOUNT_FRAGMENT, CURRENCY_PRICE_FRAGMENT } from '../../currency/fragments';
export const ORDER_FRAGMENT = gql `
  fragment orderFields on Order {
    amount {
      ...currencyAmountFields
    }
    amountRemaining {
      ...currencyAmountFields
    }
    buyOrSell
    cancelAt
    cancellationPolicy
    id
    limitPrice {
      ...currencyPriceFields
    }
    market {
      ...marketFields
    }
    placedAt
    status
    stopPrice {
      ...currencyPriceFields
    }
    type
  }
  ${CURRENCY_PRICE_FRAGMENT}
  ${CURRENCY_AMOUNT_FRAGMENT}
  ${MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL29yZGVyL2ZyYWdtZW50cy9vcmRlckZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDeEQsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDeEIsTUFBTSwwQkFBMEIsQ0FBQTtBQUVqQyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUI3Qix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLGVBQWU7Q0FDbEIsQ0FBQSJ9