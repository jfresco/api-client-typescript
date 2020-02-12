import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT } from '../../currency/fragments';
export const MOVEMENT_FRAGMENT = gql `
  fragment movementFields on Movement {
    address
    confirmations
    id
    currency
    quantity {
      ...currencyAmountFields
    }
    receivedAt
    status
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZW1lbnRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2ZyYWdtZW50cy9tb3ZlbWVudEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVuRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7OztJQVloQyx3QkFBd0I7Q0FDM0IsQ0FBQSJ9