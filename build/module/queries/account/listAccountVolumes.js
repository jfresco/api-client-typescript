import gql from 'graphql-tag';
import { CURRENCY_ACCOUNT_VOLUME_FRAGMENT } from '../currency/fragments';
export const LIST_ACCOUNT_VOLUMES = gql `
  query listAccountVolumes(
    $payload: ListAccountVolumesParams!
    $signature: Signature!
  ) {
    listAccountVolumes(payload: $payload, signature: $signature)
      @connection(key: "listAccountVolumes") {
      volumes {
        ...currencyAccountVolumeFields
      }
    }
  }
  ${CURRENCY_ACCOUNT_VOLUME_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRWb2x1bWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9saXN0QWNjb3VudFZvbHVtZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRXhFLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0lBWW5DLGdDQUFnQztDQUNuQyxDQUFBIn0=