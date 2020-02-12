import gql from 'graphql-tag';
import { CANCELED_ORDER_FRAGMENT } from '../orders/fragments';
export const CANCEL_ORDER_MUTATION = gql `
  mutation cancelOrder($payload: CancelOrderParams!, $signature: Signature!) {
    cancelOrder(payload: $payload, signature: $signature) {
      ...canceledOrderFields
    }
  }
  ${CANCELED_ORDER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsT3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXV0YXRpb25zL29yZGVycy9jYW5jZWxPcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7QUFFN0IsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFN0QsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7SUFNcEMsdUJBQXVCO0NBQzFCLENBQUEifQ==