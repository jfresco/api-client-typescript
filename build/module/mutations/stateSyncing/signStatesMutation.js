import gql from 'graphql-tag';
export const SIGN_STATES_MUTATION = gql `
  mutation signStates($payload: SignStatesParams!, $signature: String!) {
    signStates(payload: $payload, signature: $signature) {
      states {
        message
        blockchain
        nonce
        address
        balance {
          amount
          currency
        }
      }
      recycledOrders {
        message
        blockchain
      }
      serverSignedStates {
        message
        blockchain
      }
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblN0YXRlc011dGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9zdGF0ZVN5bmNpbmcvc2lnblN0YXRlc011dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQVM3QixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUJ0QyxDQUFBIn0=