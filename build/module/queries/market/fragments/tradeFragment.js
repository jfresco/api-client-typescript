import gql from 'graphql-tag';
import { CURRENCY_PRICE_FRAGMENT, CURRENCY_AMOUNT_FRAGMENT } from '../../../queries/currency/fragments';
export const TRADE_FRAGMENT = gql `
  fragment tradeFields on Trade {
    id
    makerOrderId
    takerOrderId
    executedAt
    accountSide
    limitPrice {
      ...currencyPriceFields
    }
    amount {
      ...currencyAmountFields
    }
    direction
    makerGave {
      ...currencyAmountFields
    }
    takerGave {
      ...currencyAmountFields
    }
    makerReceived {
      ...currencyAmountFields
    }
    takerReceived {
      ...currencyAmountFields
    }
    makerFee {
      ...currencyAmountFields
    }
    takerFee {
      ...currencyAmountFields
    }
  }
  ${CURRENCY_PRICE_FRAGMENT}
  ${CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGVGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21hcmtldC9mcmFnbWVudHMvdHJhZGVGcmFnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDekIsTUFBTSxxQ0FBcUMsQ0FBQTtBQUU1QyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQzdCLHVCQUF1QjtJQUN2Qix3QkFBd0I7Q0FDM0IsQ0FBQSJ9