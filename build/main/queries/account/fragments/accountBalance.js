"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../currency/fragments");
const fragments_2 = require("../../asset/fragments");
exports.ACCOUNT_BALANCE_FRAGMENT = graphql_tag_1.default `
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
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
  ${fragments_2.ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudEJhbGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9hY2NvdW50L2ZyYWdtZW50cy9hY2NvdW50QmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3Qix3REFBbUU7QUFDbkUscURBQXNEO0FBRXpDLFFBQUEsd0JBQXdCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CdkMsb0NBQXdCO0lBQ3hCLDBCQUFjO0NBQ2pCLENBQUEifQ==