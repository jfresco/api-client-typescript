"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../currency/fragments");
exports.MOVEMENT_FRAGMENT = graphql_tag_1.default `
  fragment movementFields on Movement {
    address
    confirmations
    id
    currency
    quantity {
      ...currencyAmountFields
    }
    receivedAt
    status
  }
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZW1lbnRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2ZyYWdtZW50cy9tb3ZlbWVudEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLHdEQUFtRTtBQUV0RCxRQUFBLGlCQUFpQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7OztJQVloQyxvQ0FBd0I7Q0FDM0IsQ0FBQSJ9