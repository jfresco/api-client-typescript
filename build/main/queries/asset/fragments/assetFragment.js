"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.ASSET_FRAGMENT = graphql_tag_1.default `
  fragment assetFields on Asset {
    blockchain
    blockchainPrecision
    depositPrecision
    hash
    name
    symbol
    withdrawalPrecision
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL2Fzc2V0L2ZyYWdtZW50cy9hc3NldEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRWhCLFFBQUEsY0FBYyxHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Q0FVaEMsQ0FBQSJ9