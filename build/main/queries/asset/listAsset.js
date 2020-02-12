"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.LIST_ASSETS_QUERY = graphql_tag_1.default `
  query ListAssetsQuery {
    listAssets {
      ...assetFields
    }
  }
  ${fragments_1.ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFzc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYXNzZXQvbGlzdEFzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBRTdCLDJDQUE0QztBQUUvQixRQUFBLGlCQUFpQixHQUFHLHFCQUFHLENBQUE7Ozs7OztJQU1oQywwQkFBYztDQUNqQixDQUFBIn0=