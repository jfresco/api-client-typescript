"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.GET_ASSETS_NONCES_QUERY = graphql_tag_1.default `
  query getAssetsNonces(
    $payload: GetAssetsNoncesParams!
    $signature: Signature!
  ) {
    getAssetsNonces(payload: $payload, signature: $signature)
      @connection(key: "getAssetsNonces") {
      asset
      nonces
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXNzZXRzTm9uY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbm9uY2VzL2dldEFzc2V0c05vbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUE2QjtBQUloQixRQUFBLHVCQUF1QixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3pDLENBQUEifQ==