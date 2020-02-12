import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT } from '../../currency/fragments';
import { ASSET_FRAGMENT } from '../../asset/fragments';
export const ACCOUNT_BALANCE_FRAGMENT = gql `
  fragment accountBalanceFields on AccountBalance {
    available {
      ...currencyAmountFields
    }
    inOrders {
      ...currencyAmountFields
    }
    pending {
      ...currencyAmountFields
    }
    personal {
      ...currencyAmountFields
    }
    asset {
      ...assetFields
    }
    depositAddress
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
  ${ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudEJhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2ZyYWdtZW50cy9hY2NvdW50QmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFDbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRXRELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CdkMsd0JBQXdCO0lBQ3hCLGNBQWM7Q0FDakIsQ0FBQSJ9