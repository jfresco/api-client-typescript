import gql from 'graphql-tag';
import { ADD_MOVEMENT_FRAGMENT } from './fragments/index';
export const ADD_MOVEMENT_MUTATION = gql `
  mutation addMovement($payload: AddMovementParams!, $signature: Signature!) {
    addMovement(payload: $payload, signature: $signature) {
      ...addMovementFields
    }
  }
  ${ADD_MOVEMENT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkTW92ZW1lbnRNdXRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvbW92ZW1lbnRzL2FkZE1vdmVtZW50TXV0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBRXpELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O0lBTXBDLHFCQUFxQjtDQUN4QixDQUFBIn0=