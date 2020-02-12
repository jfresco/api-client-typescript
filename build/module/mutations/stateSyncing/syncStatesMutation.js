import gql from 'graphql-tag';
export const SYNC_STATES_MUTATION = gql `
  mutation syncStates($payload: SyncStatesParams!, $signature: String!) {
    syncStates(payload: $payload, signature: $signature) {
      result
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY1N0YXRlc011dGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9zdGF0ZVN5bmNpbmcvc3luY1N0YXRlc011dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUk3QixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7OztDQU10QyxDQUFBIn0=