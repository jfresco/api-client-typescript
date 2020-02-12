"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const orderBookRecordFragment_1 = require("./orderBookRecordFragment");
exports.ORDERBOOK_FRAGMENT = graphql_tag_1.default `
  fragment marketOrderbookFields on OrderBook {
    asks {
      ...marketOrderbookRecordFields
    }
    bids {
      ...marketOrderbookRecordFields
    }
  }
  ${orderBookRecordFragment_1.ORDERBOOK_RECORD_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJCb29rRnJhZ21lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvZnJhZ21lbnRzL29yZGVyQm9va0ZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLHVFQUFxRTtBQUV4RCxRQUFBLGtCQUFrQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7OztJQVNqQyxtREFBeUI7Q0FDNUIsQ0FBQSJ9