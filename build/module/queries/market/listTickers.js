import gql from 'graphql-tag';
import { TICKER_FRAGMENT } from './fragments';
export const LIST_TICKERS = gql `
  query Tickers {
    listTickers {
      ...tickerFields
    }
  }
  ${TICKER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFRpY2tlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcXVlcmllcy9tYXJrZXQvbGlzdFRpY2tlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFBO0FBRTdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFN0MsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQTs7Ozs7O0lBTTNCLGVBQWU7Q0FDbEIsQ0FBQSJ9