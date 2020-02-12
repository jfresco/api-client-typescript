import gql from 'graphql-tag';
import { ASSET_FRAGMENT } from './fragments';
export const LIST_ASSETS_QUERY = gql `
  query ListAssetsQuery {
    listAssets {
      ...assetFields
    }
  }
  ${ASSET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFzc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYXNzZXQvbGlzdEFzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUU3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRTVDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O0lBTWhDLGNBQWM7Q0FDakIsQ0FBQSJ9