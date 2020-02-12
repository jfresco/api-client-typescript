import gql from 'graphql-tag';
export const GET_ORDERS_FOR_MOVEMENT_QUERY = gql `
  query getOrdersForMovement(
    $payload: GetOrdersForMovementParams!
    $signature: Signature!
  ) {
    getOrdersForMovement(payload: $payload, signature: $signature) {
      recycledOrders {
        blockchain
        message
      }
      assetNonce
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJzRm9yTW92ZW1lbnRRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2dldE9yZGVyc0Zvck1vdmVtZW50UXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBSTdCLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztDQWEvQyxDQUFBIn0=