import gql from 'graphql-tag';
import { MARKET_FRAGMENT } from './fragments';
export const LIST_MARKETS_QUERY = gql `
  query ListMarkets {
    listMarkets {
      ...marketFields
    }
  }
  ${MARKET_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE1hcmtldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvbGlzdE1hcmtldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFN0MsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7SUFNakMsZUFBZTtDQUNsQixDQUFBIn0=