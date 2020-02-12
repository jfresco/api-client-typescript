"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../../queries/currency/fragments");
var MovementType;
(function (MovementType) {
    MovementType["DEPOSIT"] = "DEPOSIT";
    MovementType["WITHDRAWAL"] = "WITHDRAWAL";
    MovementType["TRANSFER"] = "TRANSFER";
})(MovementType = exports.MovementType || (exports.MovementType = {}));
var MovementStatus;
(function (MovementStatus) {
    MovementStatus["CREATED"] = "CREATED";
    MovementStatus["COMPLETED"] = "COMPLETED";
    MovementStatus["FAILED"] = "FAILED";
    MovementStatus["PENDING"] = "PENDING";
})(MovementStatus = exports.MovementStatus || (exports.MovementStatus = {}));
exports.ADD_MOVEMENT_FRAGMENT = graphql_tag_1.default `
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
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkTW92ZW1lbnRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvbW92ZW1lbnRzL2ZyYWdtZW50cy9hZGRNb3ZlbWVudEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLG1FQUE4RTtBQUk5RSxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsbUNBQW1CLENBQUE7SUFDbkIseUNBQXlCLENBQUE7SUFDekIscUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBRUQsSUFBWSxjQUtYO0FBTEQsV0FBWSxjQUFjO0lBQ3hCLHFDQUFtQixDQUFBO0lBQ25CLHlDQUF1QixDQUFBO0lBQ3ZCLG1DQUFpQixDQUFBO0lBQ2pCLHFDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFMVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUt6QjtBQWNZLFFBQUEscUJBQXFCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0lBZXBDLG9DQUF3QjtDQUMzQixDQUFBIn0=