"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("apollo-client");
const apollo_link_context_1 = require("apollo-link-context");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_http_1 = require("apollo-link-http");
const listMarkets_1 = require("../queries/market/listMarkets");
const getMarket_1 = require("../queries/market/getMarket");
const listAccountTransactions_1 = require("../queries/account/listAccountTransactions");
const listAccountOrders_1 = require("../queries/order/listAccountOrders");
const listAccountTrades_1 = require("../queries/trade/listAccountTrades");
const listAccountBalances_1 = require("../queries/account/listAccountBalances");
const listMovements_1 = require("../queries/movement/listMovements");
const getAccountBalance_1 = require("../queries/account/getAccountBalance");
const getAccountOrder_1 = require("../queries/order/getAccountOrder");
const getMovement_1 = require("../queries/movement/getMovement");
const getTicker_1 = require("../queries/market/getTicker");
const cancelOrder_1 = require("../mutations/orders/cancelOrder");
const cancelAllOrders_1 = require("../mutations/orders/cancelAllOrders");
const listCandles_1 = require("../queries/candlestick/listCandles");
const listTickers_1 = require("../queries/market/listTickers");
const listTrades_1 = require("../queries/market/listTrades");
const getOrderBook_1 = require("../queries/market/getOrderBook");
const placeLimitOrder_1 = require("../mutations/orders/placeLimitOrder");
const placeMarketOrder_1 = require("../mutations/orders/placeMarketOrder");
const placeStopLimitOrder_1 = require("../mutations/orders/placeStopLimitOrder");
const placeStopMarketOrder_1 = require("../mutations/orders/placeStopMarketOrder");
const addMovementMutation_1 = require("../mutations/movements/addMovementMutation");
const getDepositAddress_1 = require("../queries/getDepositAddress");
const getAccountPortfolio_1 = require("../queries/account/getAccountPortfolio");
const listAccountVolumes_1 = require("../queries/account/listAccountVolumes");
const listAsset_1 = require("../queries/asset/listAsset");
const nonces_1 = require("../queries/nonces");
const getOrdersForMovementQuery_1 = require("../queries/movement/getOrdersForMovementQuery");
const twoFactorLoginMutation_1 = require("../mutations/account/twoFactorLoginMutation");
const utils_1 = require("./utils");
const stateSyncing_1 = require("../mutations/stateSyncing");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const array_buffer_to_hex_1 = __importDefault(require("array-buffer-to-hex"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const types_1 = require("../types");
const nash_protocol_1 = require("@neon-exchange/nash-protocol");
exports.MISSING_NONCES = 'missing_asset_nonces';
exports.MAX_SIGN_STATE_RECURSION = 5;
class Client {
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
        const headerLink = apollo_link_context_1.setContext((_, { headers }) => {
            return {
                headers: Object.assign({}, headers, { Cookie: this.casCookie })
            };
        });
        const httpLink = apollo_link_http_1.createHttpLink({ fetch: node_fetch_1.default, uri: this.opts.apiURI });
        const cache = new apollo_cache_inmemory_1.InMemoryCache();
        // XXX: Quick and dirty way to sporadically clear the cache to avoid memory leaks
        setInterval(() => {
            cache.reset();
        }, 120000);
        this.gql = new apollo_client_1.ApolloClient({
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
        const validParams = utils_1.checkMandatoryParams({
            email,
            password,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        this.walletIndices = walletIndices;
        const keys = await nash_protocol_1.getHKDFKeysFromPassword(password, config_1.SALT);
        const loginUrl = this.opts.casURI + '/user_login';
        const body = {
            email,
            password: array_buffer_to_hex_1.default(keys.authKey)
        };
        const response = await node_fetch_1.default(loginUrl, {
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
            encryptedSecretKey: nash_protocol_1.bufferize(this.account.encrypted_secret_key),
            nonce: nash_protocol_1.bufferize(this.account.encrypted_secret_key_nonce),
            tag: nash_protocol_1.bufferize(this.account.encrypted_secret_key_tag)
        };
        this.initParams = {
            walletIndices: this.walletIndices,
            encryptionKey: keys.encryptionKey,
            aead,
            marketData: helpers_1.mapMarketsForNashProtocol(this.marketData),
            assetData: this.assetData
        };
        this.nashCoreConfig = await nash_protocol_1.initialize(this.initParams);
        if (this.opts.debug) {
            console.log(this.nashCoreConfig);
        }
        if (presetWallets !== undefined) {
            const cloned = Object.assign({}, this.nashCoreConfig);
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
            mutation: twoFactorLoginMutation_1.USER_2FA_LOGIN_MUTATION,
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
        const validParams = utils_1.checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: getTicker_1.GET_TICKER,
            variables: { marketName }
        });
        const payload = utils_1.formatPayload('getTicker', result);
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
        const validParams = utils_1.checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: getOrderBook_1.GET_ORDERBOOK,
            variables: { marketName }
        });
        const payload = utils_1.formatPayload('getOrderBook', result);
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
        const validParams = utils_1.checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: listTrades_1.LIST_TRADES,
            variables: { marketName, limit, before }
        });
        return utils_1.formatPayload('listTrades', result);
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
            query: listTickers_1.LIST_TICKERS
        });
        return utils_1.formatPayload('listTickers', result);
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
            query: listAsset_1.LIST_ASSETS_QUERY
        });
        return utils_1.formatPayload('listAssets', result);
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
        const validParams = utils_1.checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: listCandles_1.LIST_CANDLES,
            variables: { marketName, before, interval, limit }
        });
        return utils_1.formatPayload('listCandles', result);
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
            query: listMarkets_1.LIST_MARKETS_QUERY
        });
        return utils_1.formatPayload('listMarkets', result);
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
        const validParams = utils_1.checkMandatoryParams({ marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const result = await this.gql.query({
            query: getMarket_1.GET_MARKET_QUERY,
            variables: { marketName }
        });
        return utils_1.formatPayload('getMarkets', result);
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
        const listAccountOrdersParams = nash_protocol_1.createListAccountOrdersParams(before, buyOrSell, limit, marketName, rangeStart, rangeStop, status, type);
        const query = shouldIncludeTrades
            ? listAccountOrders_1.LIST_ACCOUNT_ORDERS_WITH_TRADES
            : listAccountOrders_1.LIST_ACCOUNT_ORDERS;
        const signedPayload = await this.signPayload(listAccountOrdersParams);
        const result = await this.gql.query({
            query,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listAccountOrders', result);
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
        const listAccountTradeParams = nash_protocol_1.createListAccountTradesParams(before, limit, marketName);
        const signedPayload = await this.signPayload(listAccountTradeParams);
        const result = await this.gql.query({
            query: listAccountTrades_1.LIST_ACCOUNT_TRADES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listAccountTrades', result);
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
        const listAccountTransactionsParams = nash_protocol_1.createListAccountTransactionsParams(cursor, fiatSymbol, limit);
        const signedPayload = await this.signPayload(listAccountTransactionsParams);
        const result = await this.gql.query({
            query: listAccountTransactions_1.LIST_ACCOUNT_TRANSACTIONS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listAccountTransactions', result);
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
        const validParams = utils_1.checkMandatoryParams({
            ignoreLowBalance,
            Type: 'boolean'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const listAccountBalanceParams = nash_protocol_1.createListAccountBalanceParams(ignoreLowBalance);
        const signedPayload = await this.signPayload(listAccountBalanceParams);
        const result = await this.gql.query({
            query: listAccountBalances_1.LIST_ACCOUNT_BALANCES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listAccountBalances', result);
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
        const validParams = utils_1.checkMandatoryParams({ currency, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getDepositAddressParams = nash_protocol_1.createGetDepositAddressParams(currency);
        const signedPayload = await this.signPayload(getDepositAddressParams);
        const result = await this.gql.query({
            query: getDepositAddress_1.GET_DEPOSIT_ADDRESS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getDepositAddress', result);
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
        const validParams = utils_1.checkMandatoryParams({
            fiatSymbol,
            period,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountPortfolioParams = nash_protocol_1.createAccountPortfolioParams(fiatSymbol, period);
        const signedPayload = await this.signPayload(getAccountPortfolioParams);
        const result = await this.gql.query({
            query: getAccountPortfolio_1.GET_ACCOUNT_PORTFOLIO,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getAccountPorfolio', result);
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
        const validParams = utils_1.checkMandatoryParams({ movementID, Type: 'number' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getMovemementParams = nash_protocol_1.createGetMovementParams(movementID);
        const signedPayload = await this.signPayload(getMovemementParams);
        const result = await this.gql.query({
            query: getMovement_1.GET_MOVEMENT,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getMovement', result);
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
        const validParams = utils_1.checkMandatoryParams({ currency, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountBalanceParams = nash_protocol_1.createGetAccountBalanceParams(currency);
        const signedPayload = await this.signPayload(getAccountBalanceParams);
        const result = await this.gql.query({
            query: getAccountBalance_1.GET_ACCOUNT_BALANCE,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getAccountBalance', result);
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
        const validParams = utils_1.checkMandatoryParams({ orderID, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getAccountOrderParams = nash_protocol_1.createGetAccountOrderParams(orderID);
        const signedPayload = await this.signPayload(getAccountOrderParams);
        const result = await this.gql.query({
            query: getAccountOrder_1.GET_ACCOUNT_ORDER,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getAccountOrder', result);
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
        const listAccountVolumesParams = nash_protocol_1.createGetAccountVolumesParams();
        const signedPayload = await this.signPayload(listAccountVolumesParams);
        const result = await this.gql.query({
            query: listAccountVolumes_1.LIST_ACCOUNT_VOLUMES,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listAccountVolumes', result);
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
        const listMovementParams = nash_protocol_1.createListMovementsParams(currency, status, type);
        const signedPayload = await this.signPayload(listMovementParams);
        const result = await this.gql.query({
            query: listMovements_1.LIST_MOVEMENTS,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('listMovements', result);
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
        const validParams = utils_1.checkMandatoryParams({ asset, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const getOrdersForMovementParams = nash_protocol_1.createGetOrdersForMovementParams(asset);
        const signedPayload = await this.signPayload(getOrdersForMovementParams);
        const result = await this.gql.query({
            query: getOrdersForMovementQuery_1.GET_ORDERS_FOR_MOVEMENT_QUERY,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getOrdersForMovement', result);
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
        const getAssetNoncesParams = nash_protocol_1.createGetAssetsNoncesParams(assetList);
        const signedPayload = await this.signPayload(getAssetNoncesParams);
        const result = await this.gql.query({
            query: nonces_1.GET_ASSETS_NONCES_QUERY,
            variables: {
                payload: signedPayload.payload,
                signature: signedPayload.signature
            }
        });
        return utils_1.formatPayload('getAssetsNonces', result);
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
        if (depth > exports.MAX_SIGN_STATE_RECURSION) {
            throw new Error('Max sign state recursion reached.');
        }
        const signStateListPayload = nash_protocol_1.createSignStatesParams(this.state_map_from_states(getStatesData.states), this.state_map_from_states(getStatesData.recycledOrders));
        const signedStates = await this.signPayload(signStateListPayload);
        try {
            const result = await this.gql.mutate({
                mutation: stateSyncing_1.SIGN_STATES_MUTATION,
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
        const syncStatesParams = nash_protocol_1.createSyncStatesParams(stateList);
        const signedPayload = await this.signPayload(syncStatesParams);
        try {
            const result = await this.gql.mutate({
                mutation: stateSyncing_1.SYNC_STATES_MUTATION,
                variables: {
                    payload: signedPayload.payload,
                    signature: signedPayload.signature
                }
            });
            // after syncing states, we should always update asset nonces
            await this.updateTradedAssetNonces();
            return utils_1.formatPayload('syncStates', result);
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
        const cancelOrderParams = nash_protocol_1.createCancelOrderParams(orderID, marketName);
        const signedPayload = await this.signPayload(cancelOrderParams);
        const result = await this.gql.mutate({
            mutation: cancelOrder_1.CANCEL_ORDER_MUTATION,
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
            timestamp: nash_protocol_1.createTimestamp()
        };
        if (marketName !== undefined) {
            cancelAllOrderParams = {
                marketName,
                timestamp: nash_protocol_1.createTimestamp()
            };
        }
        const payloadAndKind = {
            kind: nash_protocol_1.SigningPayloadID.cancelAllOrdersPayload,
            payload: cancelAllOrderParams
        };
        const signedPayload = await this.signPayload(payloadAndKind);
        const result = await this.gql.mutate({
            mutation: cancelAllOrders_1.CANCEL_ALL_ORDERS_MUTATION,
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
        const validParams = utils_1.checkMandatoryParams({
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
        const normalizedAmount = helpers_1.normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedLimitPrice = helpers_1.normalizePriceForMarket(limitPrice, this.marketData[marketName]);
        const placeLimitOrderParams = nash_protocol_1.createPlaceLimitOrderParams(allowTaker, normalizedAmount, buyOrSell, cancellationPolicy, normalizedLimitPrice, marketName, noncesFrom, noncesTo, nonceOrder, cancelAt);
        const signedPayload = await this.signPayload(placeLimitOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: placeLimitOrder_1.PLACE_LIMIT_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return utils_1.formatPayload('placeLimitOrder', result);
        }
        catch (e) {
            if (e.message.includes(exports.MISSING_NONCES)) {
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
        const validParams = utils_1.checkMandatoryParams({
            buyOrSell,
            marketName,
            Type: 'string'
        });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = helpers_1.normalizeAmountForMarket(amount, this.marketData[marketName]);
        const placeMarketOrderParams = nash_protocol_1.createPlaceMarketOrderParams(normalizedAmount, buyOrSell, marketName, noncesFrom, noncesTo, nonceOrder);
        const signedPayload = await this.signPayload(placeMarketOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: placeMarketOrder_1.PLACE_MARKET_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return utils_1.formatPayload('placeMarketOrder', result);
        }
        catch (e) {
            if (e.message.includes(exports.MISSING_NONCES)) {
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
        const validParams = utils_1.checkMandatoryParams({ allowTaker, Type: 'boolean' }, { buyOrSell, marketName, cancellationPolicy, Type: 'string' }, { cancelAt: 'number' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = helpers_1.normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedLimitPrice = helpers_1.normalizePriceForMarket(limitPrice, this.marketData[marketName]);
        const normalizedStopPrice = helpers_1.normalizePriceForMarket(stopPrice, this.marketData[marketName]);
        const placeStopLimitOrderParams = nash_protocol_1.createPlaceStopLimitOrderParams(allowTaker, normalizedAmount, buyOrSell, cancellationPolicy, normalizedLimitPrice, marketName, normalizedStopPrice, noncesFrom, noncesTo, nonceOrder, cancelAt);
        const signedPayload = await this.signPayload(placeStopLimitOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: placeStopLimitOrder_1.PLACE_STOP_LIMIT_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return utils_1.formatPayload('placeStopLimitOrder', result);
        }
        catch (e) {
            if (e.message.includes(exports.MISSING_NONCES)) {
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
        const validParams = utils_1.checkMandatoryParams({ amount, stopPrice, Type: 'object' }, { buyOrSell, marketName, Type: 'string' });
        if (validParams.type === 'error') {
            return validParams;
        }
        const { nonceOrder, noncesFrom, noncesTo } = this.getNoncesForTrade(marketName, buyOrSell);
        const normalizedAmount = helpers_1.normalizeAmountForMarket(amount, this.marketData[marketName]);
        const normalizedStopPrice = helpers_1.normalizePriceForMarket(stopPrice, this.marketData[marketName]);
        const placeStopMarketOrderParams = nash_protocol_1.createPlaceStopMarketOrderParams(normalizedAmount, buyOrSell, marketName, normalizedStopPrice, noncesFrom, noncesTo, nonceOrder);
        const signedPayload = await this.signPayload(placeStopMarketOrderParams);
        try {
            const result = await this.gql.mutate({
                mutation: placeStopMarketOrder_1.PLACE_STOP_MARKET_ORDER_MUTATION,
                variables: {
                    payload: signedPayload.signedPayload,
                    signature: signedPayload.signature
                }
            });
            return utils_1.formatPayload('placeStopMarketOrder', result);
        }
        catch (e) {
            if (e.message.includes(exports.MISSING_NONCES)) {
                const updateNoncesOk = await this.updateTradedAssetNonces();
                if (updateNoncesOk) {
                    return await this.placeStopMarketOrder(amount, buyOrSell, marketName, stopPrice);
                }
            }
            return this.handleOrderError(e, signedPayload);
        }
    }
    handleOrderError(error, signedPayload) {
        if (error.message.includes(exports.MISSING_NONCES)) {
            this.updateTradedAssetNonces();
            throw new types_1.MissingNonceError(error.message, signedPayload);
        }
        else if (error.message.includes('Insufficient Funds')) {
            throw new types_1.InsufficientFundsError(error.message, signedPayload);
        }
        throw new Error(`Could not place order: ${JSON.stringify(error)} using payload: ${JSON.stringify(signedPayload.blockchain_raw)}`);
    }
    async signDepositRequest(address, quantity, nonce) {
        const signMovementParams = nash_protocol_1.createAddMovementParams(address, quantity, nash_protocol_1.MovementTypeDeposit, nonce);
        const signedPayload = await this.signPayload(signMovementParams);
        const result = await this.gql.mutate({
            mutation: addMovementMutation_1.ADD_MOVEMENT_MUTATION,
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
        const signMovementParams = nash_protocol_1.createAddMovementParams(address, quantity, nash_protocol_1.MovementTypeWithdrawal, nonce);
        const signedPayload = await this.signPayload(signMovementParams);
        const result = await this.gql.mutate({
            mutation: addMovementMutation_1.ADD_MOVEMENT_MUTATION,
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
        const secretKey = nash_protocol_1.getSecretKey();
        const res = nash_protocol_1.encryptSecretKey(encryptionKey, secretKey);
        const aead = {
            encryptedSecretKey: res.encryptedSecretKey,
            tag: res.tag,
            nonce: res.nonce
        };
        this.initParams = {
            walletIndices: this.walletIndices,
            encryptionKey,
            aead,
            marketData: helpers_1.mapMarketsForNashProtocol(this.marketData),
            assetData: this.assetData
        };
        this.nashCoreConfig = await nash_protocol_1.initialize(this.initParams);
        if (presetWallets !== undefined) {
            const cloned = Object.assign({}, this.nashCoreConfig);
            cloned.wallets = presetWallets;
            this.nashCoreConfig = cloned;
        }
        this.publicKey = this.nashCoreConfig.payloadSigningKey.publicKey;
        const url = this.opts.casURI + '/auth/add_initial_wallets_and_client_keys';
        const body = {
            encrypted_secret_key: array_buffer_to_hex_1.default(this.initParams.aead.encryptedSecretKey),
            encrypted_secret_key_nonce: array_buffer_to_hex_1.default(this.initParams.aead.nonce),
            encrypted_secret_key_tag: array_buffer_to_hex_1.default(this.initParams.aead.tag),
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
        const response = await node_fetch_1.default(url, {
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
        const signedPayload = nash_protocol_1.signPayload(privateKey, payloadAndKind, this.nashCoreConfig);
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
            if (direction === types_1.OrderBuyOrSell.SELL) {
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
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaWVudC9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpREFBK0Q7QUFDL0QsNkRBQWdEO0FBQ2hELGlFQUFxRDtBQUNyRCx1REFBaUQ7QUFDakQsK0RBQWtFO0FBQ2xFLDJEQUE4RDtBQUM5RCx3RkFBc0Y7QUFDdEYsMEVBRzJDO0FBQzNDLDBFQUF3RTtBQUN4RSxnRkFBOEU7QUFDOUUscUVBQWtFO0FBQ2xFLDRFQUEwRTtBQUMxRSxzRUFBb0U7QUFDcEUsaUVBQThEO0FBQzlELDJEQUF3RDtBQUN4RCxpRUFBdUU7QUFDdkUseUVBQWdGO0FBQ2hGLG9FQUFpRTtBQUNqRSwrREFBNEQ7QUFDNUQsNkRBQTBEO0FBQzFELGlFQUE4RDtBQUM5RCx5RUFBZ0Y7QUFDaEYsMkVBQWtGO0FBQ2xGLGlGQUF5RjtBQUN6RixtRkFBMkY7QUFDM0Ysb0ZBQWtGO0FBQ2xGLG9FQUFrRTtBQUNsRSxnRkFBOEU7QUFDOUUsOEVBQTRFO0FBQzVFLDBEQUE4RDtBQUM5RCw4Q0FJMEI7QUFDMUIsNkZBR3NEO0FBQ3RELHdGQUdvRDtBQUNwRCxtQ0FBNkQ7QUFFN0QsNERBS2tDO0FBQ2xDLHNDQUFnQztBQUVoQyx3Q0FJbUI7QUFDbkIsOEVBQXVDO0FBQ3ZDLDREQUE4QjtBQUM5QixvQ0FpQ2lCO0FBSWpCLGdFQW9DcUM7QUE4RXhCLFFBQUEsY0FBYyxHQUFHLHNCQUFzQixDQUFBO0FBQ3ZDLFFBQUEsd0JBQXdCLEdBQUcsQ0FBQyxDQUFBO0FBRXpDLE1BQWEsTUFBTTtJQWdCakI7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxZQUFZLElBQW1CO1FBckJ2QixpQkFBWSxHQUFhLEVBQUUsQ0FBQTtRQXNCakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFFaEIsTUFBTSxVQUFVLEdBQUcsZ0NBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9B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