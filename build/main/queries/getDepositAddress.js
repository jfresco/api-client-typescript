"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.GET_DEPOSIT_ADDRESS = graphql_tag_1.default `
  query getDepositAddress(
    $payload: GetDepositAddressParams!
    $signature: Signature
  ) {
    getDepositAddress(payload: $payload, signature: $signature)
      @connection(key: "getDepositAddress") {
      address
      currency
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGVwb3NpdEFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcXVlcmllcy9nZXREZXBvc2l0QWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUVoQixRQUFBLG1CQUFtQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3JDLENBQUEifQ==