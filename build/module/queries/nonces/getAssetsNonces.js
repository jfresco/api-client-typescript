import gql from 'graphql-tag';
export const GET_ASSETS_NONCES_QUERY = gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXNzZXRzTm9uY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvbm9uY2VzL2dldEFzc2V0c05vbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFJN0IsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7OztDQVd6QyxDQUFBIn0=