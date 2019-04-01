import gql from 'graphql-tag'

import {
    ACCOUNT_PORTFOLIO_BALANCE_FRAGMENT,
    GRAPH_POINT_FRAGMENT,
    ACCOUNT_PORTFOLIO_TOTAL_FRAGMENT,
    GraphPoint, AccountPortfolioBalance, AccountPortfolioTotal
} from './fragments'

export const GET_ACCOUNT_PORTFOLIO = gql`
  query getAccountPortfolio(
    $payload: GetAccountPortfolioParams!
    $signature: Signature!
  ) {
    getAccountPortfolio(payload: $payload, signature: $signature)
      @connection(key: "getAccountPortfolio") {
      balances {
        ...portfolioBalanceFields
      }
      graph {
        ...graphPointFields
      }
      total {
        ...accountPortfolioTotalFields
      }
    }
  }
  ${ACCOUNT_PORTFOLIO_BALANCE_FRAGMENT}
  ${GRAPH_POINT_FRAGMENT}
  ${ACCOUNT_PORTFOLIO_TOTAL_FRAGMENT}
`

export interface AccountPortfolio {
    balances: AccountPortfolioBalance[],
    total: AccountPortfolioTotal,
    graph: GraphPoint[]
}

export enum Period {
    DAY = 'DAY',
    MONTH = 'MONTH',
    SEMESTER = 'SEMESTER',
    WEEK = 'WEEK'
}