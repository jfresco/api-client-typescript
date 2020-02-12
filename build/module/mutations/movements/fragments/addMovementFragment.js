import gql from 'graphql-tag';
import { CURRENCY_AMOUNT_FRAGMENT } from '../../../queries/currency/fragments';
export var MovementType;
(function (MovementType) {
    MovementType["DEPOSIT"] = "DEPOSIT";
    MovementType["WITHDRAWAL"] = "WITHDRAWAL";
    MovementType["TRANSFER"] = "TRANSFER";
})(MovementType || (MovementType = {}));
export var MovementStatus;
(function (MovementStatus) {
    MovementStatus["CREATED"] = "CREATED";
    MovementStatus["COMPLETED"] = "COMPLETED";
    MovementStatus["FAILED"] = "FAILED";
    MovementStatus["PENDING"] = "PENDING";
})(MovementStatus || (MovementStatus = {}));
export const ADD_MOVEMENT_FRAGMENT = gql `
  fragment addMovementFields on Movement {
    address
    confirmations
    id
    currency
    quantity {
      ...currencyAmountFields
    }
    receivedAt
    status

    publicKey
    signature
  }
  ${CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkTW92ZW1lbnRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvbW92ZW1lbnRzL2ZyYWdtZW50cy9hZGRNb3ZlbWVudEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUk5RSxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLHlDQUF5QixDQUFBO0lBQ3pCLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQUVELE1BQU0sQ0FBTixJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDeEIscUNBQW1CLENBQUE7SUFDbkIseUNBQXVCLENBQUE7SUFDdkIsbUNBQWlCLENBQUE7SUFDakIscUNBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUxXLGNBQWMsS0FBZCxjQUFjLFFBS3pCO0FBY0QsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUFlcEMsd0JBQXdCO0NBQzNCLENBQUEifQ==