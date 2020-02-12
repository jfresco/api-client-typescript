import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT } from '../../currency/fragments';
export const CURRENCY_ACCOUNT_VOLUME_FRAGMENT = gql `
  fragment currencyAccountVolumeFields on CurrencyAccountVolume {
    currency
    thirtyDayVolume {
      ...currencyAmountFields
    }
    thirtyDayVolumePercent
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3lBY2NvdW50Vm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvY3VycmVuY3kvZnJhZ21lbnRzL2N1cnJlbmN5QWNjb3VudFZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFbkUsTUFBTSxDQUFDLE1BQU0sZ0NBQWdDLEdBQUcsR0FBRyxDQUFBOzs7Ozs7OztJQVEvQyx3QkFBd0I7Q0FDM0IsQ0FBQSJ9