import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { LIST_MARKETS_QUERY } from '../queries/market/listMarkets';
import { GET_MARKET_QUERY } from '../queries/market/getMarket';
import { LIST_ACCOUNT_TRANSACTIONS } from '../queries/account/listAccountTransactions';
import { LIST_ACCOUNT_ORDERS, LIST_ACCOUNT_ORDERS_WITH_TRADES } from '../queries/order/listAccountOrders';
import { LIST_ACCOUNT_TRADES } from '../queries/trade/listAccountTrades';
import { LIST_ACCOUNT_BALANCES } from '../queries/account/listAccountBalances';
import { LIST_MOVEMENTS } from '../queries/movement/listMovements';
import { GET_ACCOUNT_BALANCE } from '../queries/account/getAccountBalance';
import { GET_ACCOUNT_ORDER } from '../queries/order/getAccountOrder';
import { GET_MOVEMENT } from '../queries/movement/getMovement';
import { GET_TICKER } from '../queries/market/getTicker';
import { CANCEL_ORDER_MUTATION } from '../mutations/orders/cancelOrder';
import { CANCEL_ALL_ORDERS_MUTATION } from '../mutations/orders/cancelAllOrders';
import { LIST_CANDLES } from '../queries/candlestick/listCandles';
import { LIST_TICKERS } from '../queries/market/listTickers';
import { LIST_TRADES } from '../queries/market/listTrades';
import { GET_ORDERBOOK } from '../queries/market/getOrderBook';
import { PLACE_LIMIT_ORDER_MUTATION } from '../mutations/orders/placeLimitOrder';
import { PLACE_MARKET_ORDER_MUTATION } from '../mutations/orders/placeMarketOrder';
import { PLACE_STOP_LIMIT_ORDER_MUTATION } from '../mutations/orders/placeStopLimitOrder';
import { PLACE_STOP_MARKET_ORDER_MUTATION } from '../mutations/orders/placeStopMarketOrder';
import { ADD_MOVEMENT_MUTATION } from '../mutations/movements/addMovementMutation';
import { GET_DEPOSIT_ADDRESS } from '../queries/getDepositAddress';
import { GET_ACCOUNT_PORTFOLIO } from '../queries/account/getAccountPortfolio';
import { LIST_ACCOUNT_VOLUMES } from '../queries/account/listAccountVolumes';
import { LIST_ASSETS_QUERY } from '../queries/asset/listAsset';
import { GET_ASSETS_NONCES_QUERY } from '../queries/nonces';
import { GET_ORDERS_FOR_MOVEMENT_QUERY } from '../queries/movement/getOrdersForMovementQuery';
import { USER_2FA_LOGIN_MUTATION } from '../mutations/account/twoFactorLoginMutation';
import { checkMandatoryParams, formatPayload } from './utils';
import { SIGN_STATES_MUTATION, SYNC_STATES_MUTATION } from '../mutations/stateSyncing';
import { SALT } from '../config';
import { normalizePriceForMarket, normalizeAmountForMarket, mapMarketsForNashProtocol } from '../helpers';
import toHex from 'array-buffer-to-hex';
import fetch from 'node-fetch';
import { OrderBuyOrSell, MissingNonceError, InsufficientFundsError } from '../types';
import { getSecretKey, encryptSecretKey, getHKDFKeysFromPassword, initialize, signPayload, createAddMovementParams, createPlaceStopMarketOrderParams, createPlaceStopLimitOrderParams, createPlaceMarketOrderParams, createPlaceLimitOrderParams, createCancelOrderParams, createGetMovementParams, createGetDepositAddressParams, createGetAccountOrderParams, createGetAccountBalanceParams, createGetAccountVolumesParams, createGetAssetsNoncesParams, createGetOrdersForMovementParams, createAccountPortfolioParams, createListMovementsParams, createListAccountBalanceParams, createListAccountTransactionsParams, createListAccountOrdersParams, createListAccountTradesParams, MovementTypeDeposit, MovementTypeWithdrawal, createSyncStatesParams, bufferize, createSignStatesParams, createTimestamp, SigningPayloadID } from '@neon-exchange/nash-protocol';
export const MISSING_NONCES = 'missing_asset_nonces';
export const MAX_SIGN_STATE_RECURSION = 5;
export class Client {
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
    constructor(opts) {
        this.tradedAssets = [];
        this.opts = opts;
        const headerLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    Cookie: this.casCookie
                }
            };
        });
        const httpLink = createHttpLink({ fetch, uri: this.opts.apiURI });
        const cache = new InMemoryCache();
        // XXX: Quick and dirty way to sporadically clear the cache to avoid memory leaks
        setInterval(() => {
            cache.reset();
        }, 120000);
        this.gql = new ApolloClient({
            cache,
            link: headerLink.concat(httpLink),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all'
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all'
                }
            }
        });
    }
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
    async login({ email, password, twoFaCode, walletIndices = { neo: 1, eth: 1 }, presetWallets }) {
        // const validParams = checkMandatoryParams(
        //      )
        // if (validParams.type === 'error') {
        //   return validParams
        // }
        const validParams = checkMandatoryParams({
            email,
            password,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        this.walletIndices = walletIndices;
        const keys = await getHKDFKeysFromPassword(password, SALT);
        const loginUrl = this.opts.casURI + '/user_login';
        const body = {
            email,
            password: toHex(keys.authKey)
        };
        const response = await fetch(loginUrl, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });
        this.casCookie = response.headers.get('set-cookie');
        const result = await response.json();
        if (result.error || result.message === 'Two factor required') {
            return {
                type: 'error',
                message: result.message
            };
        }
        this.account = result.account;
        const marketPayload = await this.fetchMarketData();
        if (marketPayload.type === 'error') {
            return marketPayload;
        }
        this.marketData = marketPayload.data;
        const assetPayload = await this.fetchAssetData();
        if (assetPayload.type === 'error') {
            return assetPayload;
        }
        this.assetData = assetPayload.data;
        this.assetNonces = {};
        this.currentOrderNonce = this.createTimestamp32();
        if (twoFaCode !== undefined) {
            this.account = await this.doTwoFactorLogin(twoFaCode);
            if (this.account.type === 'error') {
                return this.account;
            }
        }
        if (this.account.encrypted_secret_key === null) {
            console.log('keys not present in the CAS: creating and uploading as we speak.');
            await this.createAndUploadKeys(keys.encryptionKey, this.casCookie, presetWallets);
            return { type: 'ok' };
        }
        const aead = {
            encryptedSecretKey: bufferize(this.account.encrypted_secret_key),
            nonce: bufferize(this.account.encrypted_secret_key_nonce),
            tag: bufferize(this.account.encrypted_secret_key_tag)
        };
        this.initParams = {
            walletIndices: this.walletIndices,
            encryptionKey: keys.encryptionKey,
            aead,
            marketData: mapMarketsForNashProtocol(this.marketData),
            assetData: this.assetData
        };
        this.nashCoreConfig = await initialize(this.initParams);
        if (this.opts.debug) {
            console.log(this.nashCoreConfig);
        }
        if (presetWallets !== undefined) {
            const cloned = { ...this.nashCoreConfig };
            cloned.wallets = presetWallets;
            this.nashCoreConfig = cloned;
        }
        this.publicKey = this.nashCoreConfig.payloadSigningKey.publicKey;
        // after login we should always try to get asset nonces
        await this.updateTradedAssetNonces();
        return { type: 'ok' };
    }
    async doTwoFactorLogin(twoFaCode) {
        const twoFaResult = await this.gql.mutate({
            mutation: USER_2FA_LOGIN_MUTATION,
            variables: { code: twoFaCode }
        });
        try {
            const result = twoFaResult.data.twoFactorLogin;
            const twoFAaccount = result.account;
            const wallets = {};
            twoFAaccount.wallets.forEach(wallet => {
                wallets[wallet.blockchain.toLowerCase()] = wallet.chainIndex;
            });
            this.walletIndices = wallets;
            return {
                encrypted_secret_key: twoFAaccount.encryptedSecretKey,
                encrypted_secret_key_nonce: twoFAaccount.encryptedSecretKeyNonce,
                encrypted_secret_key_tag: twoFAaccount.encryptedSecretKeyTag
            };
        }
        catch (e) {
            return {
                type: 'error',
                message: twoFaResult.errors
            };
        }
    }
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
    async getTicker(marketName) {
        const validParams = checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: GET_TICKER,
            variables: { marketName }
        });
        const payload = formatPayload('getTicker', result);
        return payload;
        // if(payload.type === "error") return payload
        // return ticker
    }
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
    async getOrderBook(marketName) {
        const validParams = checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: GET_ORDERBOOK,
            variables: { marketName }
        });
        const payload = formatPayload('getOrderBook', result);
        return payload;
    }
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
    async listTrades({ marketName, limit, before }) {
        const validParams = checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: LIST_TRADES,
            variables: { marketName, limit, before }
        });
        return formatPayload('listTrades', result);
    }
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
    async listTickers() {
        const result = await this.gql.query({
            query: LIST_TICKERS
        });
        return formatPayload('listTickers', result);
    }
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
    async listAssets() {
        const result = await this.gql.query({
            query: LIST_ASSETS_QUERY
        });
        return formatPayload('listAssets', result);
    }
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
    async listCandles({ marketName, before, interval, limit }) {
        const validParams = checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: LIST_CANDLES,
            variables: { marketName, before, interval, limit }
        });
        return formatPayload('listCandles', result);
    }
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
    async listMarkets() {
        const result = await this.gql.query({
            query: LIST_MARKETS_QUERY
        });
        return formatPayload('listMarkets', result);
    }
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
    async getMarket(marketName) {
        const validParams = checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: GET_MARKET_QUERY,
            variables: { marketName }
        });
        return formatPayload('getMarkets', result);
    }
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
    async listAccountOrders({ before, buyOrSell, limit, marketName, rangeStart, rangeStop, status, type, shouldIncludeTrades } = {}) {
        const listAccountOrdersParams = createListAccountOrdersParams(before, buyOrSell, limit, marketName, rangeStart, rangeStop, status, type);
        const query = shouldIncludeTrades
            ? LIST_ACCOUNT_ORDERS_WITH_TRADES
            : LIST_ACCOUNT_ORDERS;
        const signedPayload = await this.signPayload(listAccountOrdersParams);
        const result = await this.gql.query({
            query,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listAccountOrders', result);
    }
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
    async listAccountTrades({ before, limit, marketName } = {}) {
        const listAccountTradeParams = createListAccountTradesParams(before, limit, marketName);
        const signedPayload = await this.signPayload(listAccountTradeParams);
        const result = await this.gql.query({
            query: LIST_ACCOUNT_TRADES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listAccountTrades', result);
    }
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
    // should change the parameter
    // should declare de variables based on params
    async listAccountTransactions({ cursor, fiatSymbol, limit }) {
        const listAccountTransactionsParams = createListAccountTransactionsParams(cursor, fiatSymbol, limit);
        const signedPayload = await this.signPayload(listAccountTransactionsParams);
        const result = await this.gql.query({
            query: LIST_ACCOUNT_TRANSACTIONS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listAccountTransactions', result);
    }
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
    async listAccountBalances(ignoreLowBalance) {
        const validParams = checkMandatoryParams({
            ignoreLowBalance,
            Type: 'boolean'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const listAccountBalanceParams = createListAccountBalanceParams(ignoreLowBalance);
        const signedPayload = await this.signPayload(listAccountBalanceParams);
        const result = await this.gql.query({
            query: LIST_ACCOUNT_BALANCES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listAccountBalances', result);
    }
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
    async getDepositAddress(currency) {
        const validParams = checkMandatoryParams({ currency, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getDepositAddressParams = createGetDepositAddressParams(currency);
        const signedPayload = await this.signPayload(getDepositAddressParams);
        const result = await this.gql.query({
            query: GET_DEPOSIT_ADDRESS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getDepositAddress', result);
    }
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
    async getAccountPortfolio({ fiatSymbol, period } = {}) {
        const validParams = checkMandatoryParams({
            fiatSymbol,
            period,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountPortfolioParams = createAccountPortfolioParams(fiatSymbol, period);
        const signedPayload = await this.signPayload(getAccountPortfolioParams);
        const result = await this.gql.query({
            query: GET_ACCOUNT_PORTFOLIO,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getAccountPorfolio', result);
    }
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
    async getMovement(movementID) {
        const validParams = checkMandatoryParams({ movementID, Type: 'number' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getMovemementParams = createGetMovementParams(movementID);
        const signedPayload = await this.signPayload(getMovemementParams);
        const result = await this.gql.query({
            query: GET_MOVEMENT,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getMovement', result);
    }
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
    async getAccountBalance(currency) {
        const validParams = checkMandatoryParams({ currency, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountBalanceParams = createGetAccountBalanceParams(currency);
        const signedPayload = await this.signPayload(getAccountBalanceParams);
        const result = await this.gql.query({
            query: GET_ACCOUNT_BALANCE,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getAccountBalance', result);
    }
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
    async getAccountOrder(orderID) {
        const validParams = checkMandatoryParams({ orderID, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountOrderParams = createGetAccountOrderParams(orderID);
        const signedPayload = await this.signPayload(getAccountOrderParams);
        const result = await this.gql.query({
            query: GET_ACCOUNT_ORDER,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getAccountOrder', result);
    }
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
    async listAccountVolumes() {
        const listAccountVolumesParams = createGetAccountVolumesParams();
        const signedPayload = await this.signPayload(listAccountVolumesParams);
        const result = await this.gql.query({
            query: LIST_ACCOUNT_VOLUMES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listAccountVolumes', result);
    }
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
    async listMovements({ currency, status, type }) {
        const listMovementParams = createListMovementsParams(currency, status, type);
        const signedPayload = await this.signPayload(listMovementParams);
        const result = await this.gql.query({
            query: LIST_MOVEMENTS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('listMovements', result);
    }
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
    async getOrdersForMovement(asset) {
        const validParams = checkMandatoryParams({ asset, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getOrdersForMovementParams = createGetOrdersForMovementParams(asset);
        const signedPayload = await this.signPayload(getOrdersForMovementParams);
        const result = await this.gql.query({
            query: GET_ORDERS_FOR_MOVEMENT_QUERY,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getOrdersForMovement', result);
    }
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
    async getAssetNonces(assetList) {
        const getAssetNoncesParams = createGetAssetsNoncesParams(assetList);
        const signedPayload = await this.signPayload(getAssetNoncesParams);
        const result = await this.gql.query({
            query: GET_ASSETS_NONCES_QUERY,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return formatPayload('getAssetsNonces', result);
    }
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
    async getSignAndSyncStates() {
        try {
            const emptyStates = {
                states: [],
                recycledOrders: [],
                serverSignedStates: []
            };
            const signStatesRecursive = await this.signStates(emptyStates);
            const syncResult = await this.syncStates(signStatesRecursive);
            return syncResult;
        }
        catch (error) {
            return {
                type: 'error',
                message: `Could not get/sign/sync states: ${error}`
            };
        }
    }
    state_map_from_states(states) {
        return states.map(state => {
            return {
                blockchain: state.blockchain,
                message: state.message
            };
        });
    }
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
    async signStates(getStatesData, depth = 0) {
        if (depth > MAX_SIGN_STATE_RECURSION) {
            throw new Error('Max sign state recursion reached.');
        }
        const signStateListPayload = createSignStatesParams(this.state_map_from_states(getStatesData.states), this.state_map_from_states(getStatesData.recycledOrders));
        const signedStates = await this.signPayload(signStateListPayload);
        try {
            const result = await this.gql.mutate({
                mutation: SIGN_STATES_MUTATION,
                variables: {
                    payload: signedStates.signedPayload,
                    signature: signedStates.signature
                }
            });
            const signStatesData = result.data;
            // this is the response, we will send them in to be signed in the next recursive call
            const states_requiring_signing = this.state_map_from_states(signStatesData.signStates.states);
            // this is all the server signed states.  We don't really use/need these but it is good
            // for the client to have them
            const all_server_signed_states = getStatesData.serverSignedStates.concat(this.state_map_from_states(signStatesData.signStates.serverSignedStates));
            // keep a list of all states that have been signed so we can sync them
            const all_states_to_sync = getStatesData.states.concat(states_requiring_signing);
            // if input states to be signed are different than result, and that list has a length
            // we recursively call this method until the signStates calls are exhausted
            // with a max recursion depth of 5
            if (states_requiring_signing !== getStatesData.states &&
                states_requiring_signing.length > 0) {
                const recursiveStates = {
                    states: states_requiring_signing,
                    recycledOrders: signStatesData.signStates.recycledOrders,
                    serverSignedStates: all_server_signed_states
                };
                return this.signStates(recursiveStates, depth + 1);
            }
            // the result should have all the states that were signed by the server
            // and all the states signed by the client in order to call syncStates
            signStatesData.signStates.serverSignedStates = all_server_signed_states;
            signStatesData.signStates.states = all_states_to_sync;
            return signStatesData;
        }
        catch (e) {
            console.error('Could not sign states: ', e);
            return e;
        }
    }
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
    async syncStates(signStatesData) {
        const stateList = signStatesData.signStates.serverSignedStates.map(state => {
            return {
                blockchain: state.blockchain,
                message: state.message
            };
        });
        const syncStatesParams = createSyncStatesParams(stateList);
        const signedPayload = await this.signPayload(syncStatesParams);
        try {
            const result = await this.gql.mutate({
                mutation: SYNC_STATES_MUTATION,
                variables: {
                    payload: signedPayload.payload,
                    signature: signedPayload.signature
                }
            });
            // after syncing states, we should always update asset nonces
            await this.updateTradedAssetNonces();
            return formatPayload('syncStates', result);
        }
        catch (e) {
            return {
                type: 'error',
                message: 'Could not query graphql for sync states'
            };
        }
    }
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
    async cancelOrder(orderID, marketName) {
        const cancelOrderParams = createCancelOrderParams(orderID, marketName);
        const signedPayload = await this.signPayload(cancelOrderParams);
        const result = await this.gql.mutate({
            mutation: CANCEL_ORDER_MUTATION,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        const cancelledOrder = result.data.cancelOrder;
        return cancelledOrder;
    }
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
    async cancelAllOrders(marketName) {
        let cancelAllOrderParams = {
            timestamp: createTimestamp()
        };
        if (marketName !== undefined) {
            cancelAllOrderParams = {
                marketName,
                timestamp: createTimestamp()
            };
        }
        const payloadAndKind = {
            kind: SigningPayloadID.cancelAllOrdersPayload,
            payload: cancelAllOrderParams
        };
        const signedPayload = await this.signPayload(payloadAndKind);
        const result = await this.gql.mutate({
            mutation: CANCEL_ALL_ORDERS_MUTATION,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        const cancelledOrder = result.data.cancelAllOrders.accepted;
        return cancelledOrder;
    }
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
    async placeLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, cancelAt) {
        const validParams = checkMandatoryParams({
            allowTaker,
            Type: 'boolean'
        }, {
            amount,
            limitPrice,
            Type: 'object'
        }, {
            cancellationPolicy,
            buyOrSell,
            marketName,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedLimitPrice = normalizePriceForMarket(limitPrice, this.marketData[marketName]);
        const placeLimitOrderParams = createPlaceLimitOrderParams(allowTaker, normalizedAmount, buyOrSell, cancellationPolicy, normalizedLimitPrice, marketName, noncesFrom, noncesTo, nonceOrder, cancelAt);
        const signedPayload = await this.signPayload(placeLimitOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: PLACE_LIMIT_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return formatPayload('placeLimitOrder', result);
        }
        catch (e) {
            if (e.message.includes(MISSING_NONCES)) {
                const updateNoncesOk = await this.updateTradedAssetNonces();
                if (updateNoncesOk.type === 'ok') {
                    return await this.placeLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, cancelAt);
                }
            }
            return this.handleOrderError(e, signedPayload);
        }
    }
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
    async placeMarketOrder(amount, buyOrSell, marketName) {
        const validParams = checkMandatoryParams({
            buyOrSell,
            marketName,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = normalizeAmountForMarket(amount, this.marketData[marketName]);
        const placeMarketOrderParams = createPlaceMarketOrderParams(normalizedAmount, buyOrSell, marketName, noncesFrom, noncesTo, nonceOrder);
        const signedPayload = await this.signPayload(placeMarketOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: PLACE_MARKET_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return formatPayload('placeMarketOrder', result);
        }
        catch (e) {
            if (e.message.includes(MISSING_NONCES)) {
                const updateNoncesOk = await this.updateTradedAssetNonces();
                if (updateNoncesOk.type === 'ok') {
                    return await this.placeMarketOrder(amount, buyOrSell, marketName);
                }
            }
            return this.handleOrderError(e, signedPayload);
        }
    }
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
    async placeStopLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, stopPrice, cancelAt) {
        const validParams = checkMandatoryParams({ allowTaker, Type: 'boolean' }, { buyOrSell, marketName, cancellationPolicy, Type: 'string' }, { cancelAt: 'number' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedLimitPrice = normalizePriceForMarket(limitPrice, this.marketData[marketName]);
        const normalizedStopPrice = normalizePriceForMarket(stopPrice, this.marketData[marketName]);
        const placeStopLimitOrderParams = createPlaceStopLimitOrderParams(allowTaker, normalizedAmount, buyOrSell, cancellationPolicy, normalizedLimitPrice, marketName, normalizedStopPrice, noncesFrom, noncesTo, nonceOrder, cancelAt);
        const signedPayload = await this.signPayload(placeStopLimitOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: PLACE_STOP_LIMIT_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return formatPayload('placeStopLimitOrder', result);
        }
        catch (e) {
            if (e.message.includes(MISSING_NONCES)) {
                const updateNoncesOk = await this.updateTradedAssetNonces();
                if (updateNoncesOk) {
                    return await this.placeStopLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, stopPrice, cancelAt);
                }
            }
            return this.handleOrderError(e, signedPayload);
        }
    }
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
    async placeStopMarketOrder(amount, buyOrSell, marketName, stopPrice) {
        const validParams = checkMandatoryParams({ amount, stopPrice, Type: 'object' }, { buyOrSell, marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedStopPrice = normalizePriceForMarket(stopPrice, this.marketData[marketName]);
        const placeStopMarketOrderParams = createPlaceStopMarketOrderParams(normalizedAmount, buyOrSell, marketName, normalizedStopPrice, noncesFrom, noncesTo, nonceOrder);
        const signedPayload = await this.signPayload(placeStopMarketOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: PLACE_STOP_MARKET_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return formatPayload('placeStopMarketOrder', result);
        }
        catch (e) {
            if (e.message.includes(MISSING_NONCES)) {
                const updateNoncesOk = await this.updateTradedAssetNonces();
                if (updateNoncesOk) {
                    return await this.placeStopMarketOrder(amount, buyOrSell, marketName, stopPrice);
                }
            }
            return this.handleOrderError(e, signedPayload);
        }
    }
    handleOrderError(error, signedPayload) {
        if (error.message.includes(MISSING_NONCES)) {
            this.updateTradedAssetNonces();
            throw new MissingNonceError(error.message, signedPayload);
        }
        else if (error.message.includes('Insufficient Funds')) {
            throw new InsufficientFundsError(error.message, signedPayload);
        }
        throw new Error(`Could not place order: ${JSON.stringify(error)} using payload: ${JSON.stringify(signedPayload.blockchain_raw)}`);
    }
    async signDepositRequest(address, quantity, nonce) {
        const signMovementParams = createAddMovementParams(address, quantity, MovementTypeDeposit, nonce);
        const signedPayload = await this.signPayload(signMovementParams);
        const result = await this.gql.mutate({
            mutation: ADD_MOVEMENT_MUTATION,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        // after deposit or withdrawal we want to update nonces
        await this.updateTradedAssetNonces();
        return {
            result: result.data.addMovement,
            blockchain_data: signedPayload.blockchain_data
        };
    }
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
    async signWithdrawRequest(address, quantity, nonce) {
        const signMovementParams = createAddMovementParams(address, quantity, MovementTypeWithdrawal, nonce);
        const signedPayload = await this.signPayload(signMovementParams);
        const result = await this.gql.mutate({
            mutation: ADD_MOVEMENT_MUTATION,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        // after deposit or withdrawal we want to update nonces
        await this.updateTradedAssetNonces();
        return {
            result: result.data.addMovement,
            blockchain_data: signedPayload.blockchain_data
        };
    }
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
    async createAndUploadKeys(encryptionKey, casCookie, presetWallets) {
        const secretKey = getSecretKey();
        const res = encryptSecretKey(encryptionKey, secretKey);
        const aead = {
            encryptedSecretKey: res.encryptedSecretKey,
            tag: res.tag,
            nonce: res.nonce
        };
        this.initParams = {
            walletIndices: this.walletIndices,
            encryptionKey,
            aead,
            marketData: mapMarketsForNashProtocol(this.marketData),
            assetData: this.assetData
        };
        this.nashCoreConfig = await initialize(this.initParams);
        if (presetWallets !== undefined) {
            const cloned = { ...this.nashCoreConfig };
            cloned.wallets = presetWallets;
            this.nashCoreConfig = cloned;
        }
        this.publicKey = this.nashCoreConfig.payloadSigningKey.publicKey;
        const url = this.opts.casURI + '/auth/add_initial_wallets_and_client_keys';
        const body = {
            encrypted_secret_key: toHex(this.initParams.aead.encryptedSecretKey),
            encrypted_secret_key_nonce: toHex(this.initParams.aead.nonce),
            encrypted_secret_key_tag: toHex(this.initParams.aead.tag),
            signature_public_key: this.nashCoreConfig.payloadSigningKey.publicKey,
            // TODO(@anthdm): construct the wallets object in more generic way.
            wallets: [
                {
                    address: this.nashCoreConfig.wallets.neo.address,
                    blockchain: 'neo',
                    public_key: this.nashCoreConfig.wallets.neo.publicKey
                },
                {
                    address: this.nashCoreConfig.wallets.eth.address,
                    blockchain: 'eth',
                    public_key: this.nashCoreConfig.wallets.eth.publicKey
                },
                {
                    address: this.nashCoreConfig.wallets.btc.address,
                    blockchain: 'btc',
                    public_key: this.nashCoreConfig.wallets.btc.publicKey
                }
            ]
        };
        const response = await fetch(url, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', cookie: casCookie },
            method: 'POST'
        });
        const result = await response.json();
        if (result.error) {
            throw new Error(result.message);
        }
        if (this.opts.debug) {
            console.log('successfully uploaded wallet keys to the CAS');
        }
    }
    /**
     * helper function that returns the correct types for the needed GQL queries
     * and mutations.
     *
     * @param [SigningPayloadID]
     * @param payload
     * @returns
     */
    async signPayload(payloadAndKind) {
        const privateKey = Buffer.from(this.nashCoreConfig.payloadSigningKey.privateKey, 'hex');
        const signedPayload = signPayload(privateKey, payloadAndKind, this.nashCoreConfig);
        return {
            payload: payloadAndKind.payload,
            signature: {
                publicKey: this.publicKey,
                signedDigest: signedPayload.signature
            },
            blockchain_data: signedPayload.blockchainMovement,
            blockchain_raw: signedPayload.blockchainRaw,
            signedPayload: signedPayload.payload
        };
    }
    async updateTradedAssetNonces() {
        try {
            const payload = await this.getAssetNonces(this.tradedAssets);
            if (payload.type === 'error') {
                return {
                    type: 'error',
                    message: 'failed to retrieve nonces data'
                };
            }
            const nonces = payload.data;
            const assetNonces = {};
            nonces.forEach(item => {
                assetNonces[item.asset] = item.nonces;
            });
            this.assetNonces = assetNonces;
            return { type: 'ok' };
        }
        catch (e) {
            return {
                type: 'error',
                message: `Could not update traded asset nonces: ${JSON.stringify(e)}`
            };
        }
    }
    createTimestamp32() {
        return Math.trunc(new Date().getTime() / 10) - 155000000000;
    }
    getNoncesForTrade(marketName, direction) {
        try {
            const pairs = marketName.split('_');
            const unitA = pairs[0];
            const unitB = pairs[1];
            this.currentOrderNonce = this.currentOrderNonce + 1;
            let noncesTo = this.assetNonces[unitA];
            let noncesFrom = this.assetNonces[unitB];
            if (direction === OrderBuyOrSell.SELL) {
                noncesTo = this.assetNonces[unitB];
                noncesFrom = this.assetNonces[unitA];
            }
            return {
                noncesTo,
                noncesFrom,
                nonceOrder: this.currentOrderNonce
            };
        }
        catch (e) {
            console.info(`Could not get nonce set: ${e}`);
            return e;
        }
    }
    async fetchMarketData() {
        if (this.opts.debug) {
            console.log('fetching latest exchange market data');
        }
        const payload = await this.listMarkets();
        if (payload.type === 'error') {
            return payload;
        }
        const markets = payload.data;
        const marketAssets = [];
        if (markets) {
            const marketData = {};
            let market;
            for (const it of Object.keys(markets)) {
                market = markets[it];
                marketData[market.name] = market;
                if (!marketAssets.includes(market.aUnit)) {
                    marketAssets.push(market.aUnit);
                }
                if (!marketAssets.includes(market.bUnit)) {
                    marketAssets.push(market.bUnit);
                }
            }
            this.tradedAssets = marketAssets;
            return {
                type: 'ok',
                data: marketData
            };
        }
        else {
            return {
                type: 'error',
                message: 'fail to retrieve market assets data'
            };
        }
    }
    async fetchAssetData() {
        const assetList = {};
        try {
            const payload = await this.listAssets();
            if (payload.type === 'error') {
                return payload;
            }
            const assets = payload.data;
            for (const a of assets) {
                assetList[a.symbol] = {
                    hash: a.hash,
                    precision: 8,
                    blockchain: a.blockchain
                };
            }
        }
        catch (e) {
            console.log('Could not get assets: ', e);
            return {
                type: 'error',
                message: 'Could not get assets'
            };
        }
        return {
            type: 'ok',
            data: assetList
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaWVudC9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUE7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUE7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUNMLG1CQUFtQixFQUNuQiwrQkFBK0IsRUFDaEMsTUFBTSxvQ0FBb0MsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFBO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUN4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUNoRixPQUFPLEVBQUUsWUFBWSxF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