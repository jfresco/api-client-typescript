"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../../currency/fragments");
exports.CURRENCY_ACCOUNT_VOLUME_FRAGMENT = graphql_tag_1.default `
  fragment currencyAccountVolumeFields on CurrencyAccountVolume {
    currency
    thirtyDayVolume {
      ...currencyAmountFields
    }
    thirtyDayVolumePercent
  }
  ${fragments_1.CURRENCY_AMOUNT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3lBY2NvdW50Vm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvY3VycmVuY3kvZnJhZ21lbnRzL2N1cnJlbmN5QWNjb3VudFZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUU3Qix3REFBbUU7QUFFdEQsUUFBQSxnQ0FBZ0MsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7OztJQVEvQyxvQ0FBd0I7Q0FDM0IsQ0FBQSJ9