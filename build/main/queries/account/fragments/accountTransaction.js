"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const confirmations_1 = require("./confirmations");
const fragments_1 = require("../../currency/fragments");
exports.ACCOUNT_TRANSACTION_FRAGMENT = graphql_tag_1.default `
  fragment accountTransactionFields on AccountTransaction {
    address
    blockDatetime
    blockIndex
    blockchain
    confirmations {
      ...confirmationsFields
    }
    fiatValue
    status
    txid
    type
    value {
      ...currencyAmountFields
    }
  }
  ${confirmations_1.CONFIRMATIONS_FRAGMENT}
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFRyYW5zYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9mcmFnbWVudHMvYWNjb3VudFRyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLG1EQUF3RDtBQUN4RCx3REFBbUU7QUFFdEQsUUFBQSw0QkFBNEIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCM0Msc0NBQXNCO0lBQ3RCLG9DQUF3QjtDQUMzQixDQUFBIn0=