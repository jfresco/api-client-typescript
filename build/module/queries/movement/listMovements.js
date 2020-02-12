import gql from 'graphql-tag';
import { MOVEMENT_FRAGMENT } from './fragments';
export const LIST_MOVEMENTS = gql `
  query listMovements($payload: ListMovementsParams!, $signature: Signature) {
    listMovements(payload: $payload, signature: $signature) {
      ...movementFields
    }
  }
  ${MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE1vdmVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyaWVzL21vdmVtZW50L2xpc3RNb3ZlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUUvQyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7SUFNN0IsaUJBQWlCO0NBQ3BCLENBQUEifQ==