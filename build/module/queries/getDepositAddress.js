import gql from 'graphql-tag';
export const GET_DEPOSIT_ADDRESS = gql `
  query getDepositAddress(
    $payload: GetDepositAddressParams!
    $signature: Signature
  ) {
    getDepositAddress(payload: $payload, signature: $signature)
      @connection(key: "getDepositAddress") {
      address
      currency
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGVwb3NpdEFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcXVlcmllcy9nZXREZXBvc2l0QWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7OztDQVdyQyxDQUFBIn0=