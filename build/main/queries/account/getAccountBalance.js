"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.GET_ACCOUNT_BALANCE = graphql_tag_1.default `
  query getAccountBalance(
    $payload: GetAccountBalanceParams!
    $signature: Signature
  ) {
    getAccountBalance(payload: $payload, signature: $signature)
      @connection(key: "getAccountBalance") {
      ...accountBalanceFields
    }
  }
  ${fragments_1.ACCOUNT_BALANCE_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWNjb3VudEJhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2dldEFjY291bnRCYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLDJDQUFzRDtBQUV6QyxRQUFBLG1CQUFtQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7SUFVbEMsb0NBQXdCO0NBQzNCLENBQUEifQ==