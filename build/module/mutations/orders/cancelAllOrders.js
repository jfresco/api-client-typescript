import gql from 'graphql-tag';
export const CANCEL_ALL_ORDERS_MUTATION = gql `
  mutation cancelAllOrders(
    $payload: CancelAllOrdersParams!
    $signature: Signature!
  ) {
    cancelAllOrders(payload: $payload, signature: $signature) {
      accepted
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsQWxsT3JkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9vcmRlcnMvY2FuY2VsQWxsT3JkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztDQVM1QyxDQUFBIn0=