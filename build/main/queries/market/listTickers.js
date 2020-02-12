"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_TICKERS = graphql_tag_1.default `
  query Tickers {
    listTickers {
      ...tickerFields
    }
  }
  ${fragments_1.TICKER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFRpY2tlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvbGlzdFRpY2tlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsMkNBQTZDO0FBRWhDLFFBQUEsWUFBWSxHQUFHLHFCQUFHLENBQUE7Ozs7OztJQU0zQiwyQkFBZTtDQUNsQixDQUFBIn0=