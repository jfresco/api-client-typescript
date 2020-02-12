"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_MARKETS_QUERY = graphql_tag_1.default `
  query ListMarkets {
    listMarkets {
      ...marketFields
    }
  }
  ${fragments_1.MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE1hcmtldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvbGlzdE1hcmtldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IsMkNBQTZDO0FBRWhDLFFBQUEsa0JBQWtCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0lBTWpDLDJCQUFlO0NBQ2xCLENBQUEifQ==