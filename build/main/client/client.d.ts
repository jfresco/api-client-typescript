import { AssetsNoncesData } from '../queries/nonces';
import { OrdersForMovementData } from '../queries/movement/getOrdersForMovementQuery';
import { Result } from '../types';
import { GetStatesData, SignStatesData } from '../mutations/stateSyncing';
import { FiatCurrency } from '../constants/currency';
import { OrderBook, TradeHistory, Ticker, CandleRange, CandleInterval, AccountDepositAddress, Movement, MovementStatus, MovementType, AccountPortfolio, AccountVolume, Period, CancelledOrder, AccountBalance, AccountTransaction, OrderPlaced, Market, Order, DateTime, AccountOrder, OrderBuyOrSell, OrderCancellationPolicy, CurrencyAmount, CurrencyPrice, PaginationCursor, OrderStatus, OrderType, SignMovementResult, AssetData, Asset } from '../types';
import { CryptoCurrency } from '../constants/currency';
/**
 * ClientOptions is used to configure and construct a new Nash API Client.
 */
export interface ClientOptions {
    apiURI: string;
    casURI: string;
    debug?: boolean;
}
export interface NonceSet {
    noncesFrom: number[];
    noncesTo: number[];
    nonceOrder: number;
}
interface ListAccountTradeParams {
    before?: PaginationCursor;
    limit?: number;
    marketName?: string;
}
interface ListAccountTransactionsParams {
    cursor?: string;
    fiatSymbol?: string;
    limit?: number;
}
interface GetAccountPortfolioParams {
    fiatSymbol?: FiatCurrency;
    period?: Period;
}
interface LoginParams {
    email: string;
    password: string;
    twoFaCode?: string;
    walletIndices: {
        [key: string]: number;
    };
    presetWallets?: object;
}
interface ListTradeParams {
    marketName: string;
    limit?: number;
    before?: PaginationCursor;
}
interface ListCandlesParams {
    marketName: string;
    before?: DateTime;
    interval?: CandleInterval;
    limit?: number;
}
interface ListMovementsParams {
    currency?: CryptoCurrency;
    status?: MovementStatus;
    type?: MovementType;
}
interface ListAccountOrderParams {
    before?: PaginationCursor;
    buyOrSell?: OrderBuyOrSell;
    limit?: number;
    marketName?: string;
    rangeStart?: DateTime;
    rangeStop?: DateTime;
    status?: [OrderStatus];
    type?: [OrderType];
    shouldIncludeTrades?: boolean;
}
export declare const MISSING_NONCES = "missing_asset_nonces";
export declare const MAX_SIGN_STATE_RECURSION = 5;
export declare class Client {
    private opts;
    private initParams;
    private nashCoreConfig;
    private casCookie;
    private account;
    private publicKey;
    private gql;
    private walletIndices;
    marketData: {
        [key: string]: Market;
    };
    assetData: {
        [key: string]: AssetData;
    };
    private tradedAssets;
    private assetNonces;
    private currentOrderNonce;
    /**
     * Create a new instance of [[Client]]
     *
     * @param opts
     * @returns
     *
     * Example
     * ```
     * import { Client } from '@neon-exchange/api-client-typescript'
     *
     * const nash = new Client({
     *   apiURI: 'https://pathtoapiurl',
     *   casURI: 'https://pathtocasurl',
     *   debug: true
     * })
     * ```
     */
    constructor(opts: ClientOptions);
    /**
     * Login against the central account service. A login is required for all signed
     * request.
     * @returns
     * @param email
     * @param password
     * @param twoFaCode (optional)
     * @returns
     *
     * Example
     * ```
     * const email = 'user@nash.io`
     * const password = `yourpassword`
     *
     * nash.login({
     *   email,
     *   password
     * })
     * .then(_ => console.log('login success'))
     * .catch(e => console.log(`login failed ${e}`)
     * ```
     */
    login({ email, password, twoFaCode, walletIndices, presetWallets }: LoginParams): Promise<Result<boolean>>;
    private doTwoFactorLogin;
    /**
     * Get a single [[Ticker]] for the given market name.
     *
     * @param marketName
     * @returns
     *
     * Example
     * ```
     * const ticker = await nash.getTicker('neo_gas')
     * console.log(ticker)
     * ```
     */
    getTicker(marketName: string): Promise<Result<Ticker>>;
    /**
     * Get the [[OrderBook]] for the given market.
     *
     * @param marketName
     * @returns
     *
     * Example
     * ```
     * const orderBook = await nash.getOrderBook('neo_gas')
     * console.log(orderBook.bids)
     * ```
     */
    getOrderBook(marketName: string): Promise<Result<OrderBook>>;
    /**
     * Get [[TradeHistory]] for the given market name.
     *
     * @param marketName
     * @param limit
     * @param before
     * @returns
     *
     * Example
     * ```
     * const tradeHistory = await nash.listTrades({
     *   marketname : 'neo_gas'
     * })
     * console.log(tradeHistory.trades)
     * ```
     */
    listTrades({ marketName, limit, before }: ListTradeParams): Promise<Result<TradeHistory>>;
    /**
     * Fetches as list of all available [[Ticker]] that are active on the exchange.
     *
     * @returns
     *
     * Example
     * ```
     * const tickers = await nash.listTickers()
     * console.log(tickers)
     * ```
     */
    listTickers(): Promise<Result<Ticker[]>>;
    /**
     * Fetches as list of all available [[Asset]] that are active on the exchange.
     *
     * @returns
     *
     * Example
     * ```
     * const assets = await nash.listAssets()
     * console.log(assets)
     * ```
     */
    listAssets(): Promise<Result<Asset[]>>;
    /**
     * List a [[CandleRange]] for the given market.
     *
     * @param marketName
     * @param before
     * @param interval
     * @param limit
     * @returns
     *
     * Example
     * ```
     * const candleRange = await nash.listCandles({
     *   marketName : 'neo_gas'
     * })
     * console.log(candleRange)
     * ``
     */
    listCandles({ marketName, before, interval, limit }: ListCandlesParams): Promise<Result<CandleRange>>;
    /**
     * List all available markets.
     *
     * @returns
     *
     * Example
     * ```
     * const {markets, error} = await nash.listMarkets()
     * console.log(markets)
     * ```
     */
    listMarkets(): Promise<Result<Market[]>>;
    /**
     * Get a specific [[Market]] by name.
     *
     * @param marketName
     * @returns
     *
     * Example
     * ```
     * const market = await nash.getMarket('neo_gas')
     * console.log(market)
     * ```
     */
    getMarket(marketName: string): Promise<Result<Market>>;
    /**
     * list available orders for the current authenticated account.
     * @param before
     * @param buyOrSell
     * @param limit
     * @param marketName
     * @param rangeStart
     * @param rangeStop
     * @param status
     * @param type
     * @returns
     *
     * Example
     * ```
     * const accountOrder = await nash.listAccountOrders({
     *   marketName : 'neo_eth'
     * })
     * console.log(accountOrder.orders)
     * ```
     */
    listAccountOrders({ before, buyOrSell, limit, marketName, rangeStart, rangeStop, status, type, shouldIncludeTrades }?: ListAccountOrderParams): Promise<Result<AccountOrder>>;
    /**
     * list available trades for the current authenticated account.
     *
     * @param {ListAccountTradeParams} params
     * @returns
     *
     * Example
     * ```
     * const tradeHistory = await nash.listAccountTrades({
     *   limit : 10,
     *   marketName : 'neo_eth'
     * })
     * console.log(tradeHistory.trades)
     * ```
     */
    listAccountTrades({ before, limit, marketName }?: ListAccountTradeParams): Promise<Result<TradeHistory>>;
    /**
     * List available account transactions.
     *
     * @param cursor
     * @param fiatSymbol
     * @param limit
     * @returns
     *
     * Example
     * ```
     * const accountTransaction = await nash.listAccountTransactions({
     *   limit : 150,
     *   ${paramName} : ${paramValue}
     * })
     * console.log(accountTransaction.transactions)
     * ```
     */
    listAccountTransactions({ cursor, fiatSymbol, limit }: ListAccountTransactionsParams): Promise<Result<AccountTransaction>>;
    /**
     * List all balances for current authenticated account.
     *
     * @param ignoreLowBalance
     * @returns
     *
     * Example
     * ```
     * const accountBalance = await nash.listAccountBalances()
     * console.log(accountBalance)
     * ```
     */
    listAccountBalances(ignoreLowBalance: any): Promise<Result<AccountBalance[]>>;
    /**
     * Get the deposit address for the given crypto currency.
     *
     * @param currency
     * @returns
     *
     * Example
     * ```
     * import { CryptoCurrency } from '@neon-exchange/api-client-typescript'
     *
     * const address = await nash.getDepositAddress(CryptoCurrency.NEO)
     * console.log(address)
     * ```
     */
    getDepositAddress(currency: CryptoCurrency): Promise<Result<AccountDepositAddress>>;
    /**
     * Get the [[AccountPortfolio]] for the current authenticated account.
     *
     * @param fiatSymbol
     * @param period
     * @returns
     *
     * Example
     * ```
     * const accountPortfolio = await nash.getAccountPortfolio()
     * console.log(accountPortfolio)
     * ```
     */
    getAccountPortfolio({ fiatSymbol, period }?: GetAccountPortfolioParams): Promise<Result<AccountPortfolio>>;
    /**
     * Get a [[Movement]] by the given id.
     *
     * @param movementID
     * @returns
     *
     * Example
     * ```
     * const movement = await nash.getMovement(1)
     * console.log(movement)
     * ```
     */
    getMovement(movementID: number): Promise<Result<Movement>>;
    /**
     * Get [[AccountBalance]] for the given crypto currency.
     *
     * @param currency
     * @returns
     *
     * Example
     * ```
     * import { CryptoCurrency } from '@neon-exchange/api-client-typescript'
     *
     * const accountBalance = await nash.getAcountBalance(CryptoCurrency.ETH)
     * console.log(accountBalance)
     * ```
     */
    getAccountBalance(currency: CryptoCurrency): Promise<Result<AccountBalance>>;
    /**
     * Get an order by ID.
     *
     * @param orderID
     * @returns
     *
     * Example
     * ```
     * const order = await nash.getAccountOrder('999')
     * console.log(order)
     * ```
     */
    getAccountOrder(orderID: string): Promise<Result<Order>>;
    /**
     * List all volumes for the current authenticated account.
     *
     * @returns
     *
     * Example
     * ```
     * const accountVolume = await nash.listAccountVolumes()
     * console.log(accountVolume.thirtyDayTotalVolumePercent)
     * ```
     */
    listAccountVolumes(): Promise<Result<AccountVolume>>;
    /**
     * List all movements for the current authenticated account.
     *
     * @param currency
     * @param status
     * @param type
     * @returns
     *
     * Example
     * ```
     * const movements = await nash.listMovements({
     *   currency : 'eth'
     * })
     * console.log(movements)
     * ```
     */
    listMovements({ currency, status, type }: ListMovementsParams): Promise<Result<Movement[]>>;
    /**
     * List all orders for a given movement
     *
     * @returns
     *
     * Example
     * ```
     * const getOrdersForMovementData = await nash.getOrdersForMovement(unit)
     * console.log(getOrdersForMovementData)
     * ```
     */
    getOrdersForMovement(asset: string): Promise<Result<OrdersForMovementData>>;
    /**
     * List all current asset nonces
     *
     * @returns
     *
     * Example
     * ```
     * const getNoncesData = await nash.getAssetNonces()
     * console.log(getNoncesData)
     * ```
     */
    getAssetNonces(assetList: string[]): Promise<Result<AssetsNoncesData[]>>;
    /**
     * Gets Balance States, Signs Balance States, then Syncs Balance states to the server
     *
     * @returns
     *
     * Example
     * ```
     * const getSignSyncStates = await nash.getSignAndSyncStates()
     * console.log(getSignSyncStates)
     * ```
     */
    getSignAndSyncStates(): Promise<Result<boolean>>;
    private state_map_from_states;
    /**
     * Submit all states and open orders to be signed for settlement
     *
     * @returns
     *
     * Example
     * ```
     * const signStatesResult = await nash.signStates(getStatesResult)
     * console.log(signStatesResult)
     * ```
     */
    signStates(getStatesData: GetStatesData, depth?: number): Promise<SignStatesData>;
    /**
     * List all states and open orders to be signed for settlement
     *
     * @returns
     *
     * Example
     * ```
     * const getStatesData = await nash.getStates()
     * console.log(getStatesData)
     * ```
     */
    syncStates(signStatesData: SignStatesData): Promise<Result<boolean>>;
    /**
     * Cancel an order by ID.
     *
     * @param orderID
     * @returns
     *
     * Example
     * ```
     * const cancelledOrder = await nash.cancelOrder('11')
     * console.log(cancelledOrder)
     * ```
     */
    cancelOrder(orderID: string, marketName: string): Promise<CancelledOrder>;
    /**
     * Cancel all orders by market name
     *
     * @param marketName
     * @returns
     *
     * Example
     * ```
     * const result = await nash.cancelAllOrders('neo_gas')
     * console.log(result)
     * ```
     */
    cancelAllOrders(marketName?: string): Promise<Result<boolean>>;
    /**
     * Place a limit order.
     *
     * @param allowTaker
     * @param amount
     * @param buyOrSell
     * @param cancelationPolicy
     * @param limitPrice
     * @param marketName
     * @param cancelAt
     * @returns
     *
     * Example
     * ```typescript
     * import {
     *   createCurrencyAmount,
     *   createCurrencyPrice,
     *   OrderBuyOrSell,
     *   OrderCancellationPolicy
     * } from '@neon-exchange/api-client-typescript'
     *
     * const order = await nash.placeLimitOrder(
     *   false,
     *   createCurrencyAmount('1', CryptoCurrency.NEO),
     *   OrderBuyOrSell.BUY,
     *   OrdeCancellationPolicy.GOOD_TILL_CANCELLED,
     *   createCurrencyPrice('0.01', CryptoCurrency.GAS, CryptoCurrency.NEO),
     *   'neo_gas'
     * )
     * console.log(order.status)
     * ```
     */
    placeLimitOrder(allowTaker: boolean, amount: CurrencyAmount, buyOrSell: OrderBuyOrSell, cancellationPolicy: OrderCancellationPolicy, limitPrice: CurrencyPrice, marketName: string, cancelAt?: DateTime): Promise<Result<OrderPlaced>>;
    /**
     * Place a market order.
     *
     * @param amount
     * @param buyOrSell
     * @param marketName
     * @returns
     *
     * Example
     * ```typescript
     * import {
     *   createCurrencyAmount,
     *   OrderBuyOrSell,
     * } from '@neon-exchange/api-client-typescript'
     *
     * const order = await nash.placeMarketOrder(
     *   createCurrencyAmount('1.00', CryptoCurrency.NEO),
     *   OrderBuyOrSell.SELL,
     *   'neo_gas'
     * )
     * console.log(order.status)
     * ```
     */
    placeMarketOrder(amount: CurrencyAmount, buyOrSell: OrderBuyOrSell, marketName: string): Promise<Result<OrderPlaced>>;
    /**
     * Place a stop limit order.
     *
     * @param allowTaker
     * @param amount
     * @param buyOrSell
     * @param cancellationPolicy
     * @param limitPrice
     * @param marketName
     * @param stopPrice
     * @param cancelAt
     * @returns
     *
     * Example
     * ```typescript
     * import {
     *   createCurrencyAmount,
     *   createCurrencyPrice,
     *   OrderBuyOrSell,
     *   OrderCancellationPolicy
     * } from '@neon-exchange/api-client-typescript'
     *
     * const order = await nash.placeStopLimitOrder(
     *   false,
     *   createCurrencyAmount('1', CryptoCurrency.NEO),
     *   OrderBuyOrSell.BUY,
     *   OrdeCancellationPolicy.GOOD_TILL_CANCELLED,
     *   createCurrencyPrice('0.01', CryptoCurrency.GAS, CryptoCurrency.NEO),
     *   'neo_gas'
     *   createCurrencyPrice('0.02', CryptoCurrency.GAS, CryptoCurrency.NEO)
     * )
     * console.log(order.status)
     * ```
     */
    placeStopLimitOrder(allowTaker: boolean, amount: CurrencyAmount, buyOrSell: OrderBuyOrSell, cancellationPolicy: OrderCancellationPolicy, limitPrice: CurrencyPrice, marketName: string, stopPrice: CurrencyPrice, cancelAt?: DateTime): Promise<Result<OrderPlaced>>;
    /**
     * Place a stop market order.
     *
     * @param amount
     * @param buyOrSell
     * @param marketName
     * @param stopPrice
     * @returns
     *
     * Example
     * ```typescript
     * import {
     *   createCurrencyAmount,
     *   createCurrencyPrice,
     *   OrderBuyOrSell,
     * } from '@neon-exchange/api-client-typescript'
     *
     * const order = await nash.placeStopLimitOrder(
     *   createCurrencyAmount('1', CryptoCurrency.NEO),
     *   OrderBuyOrSell.BUY,
     *   'neo_gas'
     *   createCurrencyPrice('0.02', CryptoCurrency.GAS, CryptoCurrency.NEO)
     * )
     * console.log(order.status)
     * ```
     */
    placeStopMarketOrder(amount: CurrencyAmount, buyOrSell: OrderBuyOrSell, marketName: string, stopPrice: CurrencyPrice): Promise<Result<OrderPlaced>>;
    private handleOrderError;
    signDepositRequest(address: string, quantity: CurrencyAmount, nonce?: number): Promise<SignMovementResult>;
    /**
     * Sign a withdraw request.
     *
     * @param address
     * @param quantity
     * @returns
     *
     * Example
     * ```typescript
     * import { createCurrencyAmount } from '@neon-exchange/api-client-ts'
     *
     * const address = 'd5480a0b20e2d056720709a9538b17119fbe9fd6';
     * const amount = createCurrencyAmount('1.5', CryptoCurrency.ETH);
     * const signedMovement = await nash.signWithdrawRequest(address, amount);
     * console.log(signedMovement)
     * ```
     */
    signWithdrawRequest(address: string, quantity: CurrencyAmount, nonce?: number): Promise<SignMovementResult>;
    /**
     * creates and uploads wallet and encryption keys to the CAS.
     *
     * expects something like the following
     * {
     *   "signature_public_key": "024b14170f0166ff85882356295f5aa0cf4a9a5d29725b5a9e410ec193d20ee98f",
     *   "encrypted_secret_key": "eb13bb0e89102d64700906c7082f9472",
     *   "encrypted_secret_key_nonce": "f6783fe349320f71acc2ca79",
     *   "encrypted_secret_key_tag": "7c8dc1020de77cd42dbbbb850f4335e8",
     *   "wallets": [
     *     {
     *       "blockchain": "neo",
     *       "address": "Aet6eGnQMvZ2xozG3A3SvWrMFdWMvZj1cU",
     *       "public_key": "039fcee26c1f54024d19c0affcf6be8187467c9ba4749106a4b897a08b9e8fed23"
     *     },
     *     {
     *       "blockchain": "ethereum",
     *       "address": "5f8b6d9d487c8136cc1ad87d6e176742af625de8",
     *       "public_key": "04d37f1a8612353ffbf20b0a68263b7aae235bd3af8d60877ed8135c27630d895894885f220a39acab4e70b025b1aca95fab1cd9368bf3dc912ef32dc65aecfa02"
     *     }
     *   ]
     * }
     */
    private createAndUploadKeys;
    /**
     * helper function that returns the correct types for the needed GQL queries
     * and mutations.
     *
     * @param [SigningPayloadID]
     * @param payload
     * @returns
     */
    private signPayload;
    private updateTradedAssetNonces;
    private createTimestamp32;
    private getNoncesForTrade;
    private fetchMarketData;
    private fetchAssetData;
}
export {};
