import gql from 'graphql-tag';
export const ASSET_FRAGMENT = gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRGcmFnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL2Fzc2V0L2ZyYWdtZW50cy9hc3NldEZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O0NBVWhDLENBQUEifQ==