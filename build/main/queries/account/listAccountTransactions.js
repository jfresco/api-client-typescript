"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const accountTransaction_1 = require("./fragments/accountTransaction");
exports.LIST_ACCOUNT_TRANSACTIONS = graphql_tag_1.default `
  query listAccountTransactions(
    $payload: ListAccountTransactionsParams!
    $signature: Signature!
  ) {
    listAccountTransactions(payload: $payload, signature: $signature)
      @connection(key: "listAccountTransactions") {
      nextCursor
      transactions {
        ...accountTransactionFields
      }
    }
  }
  ${accountTransaction_1.ACCOUNT_TRANSACTION_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRUcmFuc2FjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2xpc3RBY2NvdW50VHJhbnNhY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLHVFQUE2RTtBQUVoRSxRQUFBLHlCQUF5QixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7SUFheEMsaURBQTRCO0NBQy9CLENBQUEifQ==