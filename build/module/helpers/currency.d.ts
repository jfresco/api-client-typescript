import { CurrencyAmount, Market, CurrencyPrice } from '../types';
import { CryptoCurrency } from '../constants/currency';
import { Market as MarketAuth } from '@neon-exchange/nash-protocol';
declare type MarketData = {
    [key: string]: MarketAuth;
};
/**
 *
 * @param amount
 * @param currency
 */
export declare function createCurrencyAmount(amount: string, currency: CryptoCurrency): CurrencyAmount;
/**
 *
 * @param amount
 * @param currencyA
 * @param currencyB
 */
export declare function createCurrencyPrice(amount: string, currencyA: CryptoCurrency, currencyB: CryptoCurrency): CurrencyPrice;
export declare const getPrecisionFromMarketString: (exp: string) => number;
/**
 * Normalizes the given amount based on the given trade size.
 *
 * @param amount
 * @param tradeSize
 */
export declare function normalizeAmountForMarketPrecision(amount: string, tradeSize: number): string;
export declare function normalizeAmountForMarket(amount: CurrencyAmount, market: Market): CurrencyAmount;
export declare function normalizePriceForMarket(price: CurrencyPrice, market: Market): CurrencyPrice;
export declare function mapMarketsForNashProtocol(markets: {
    [key: string]: Market;
}): MarketData;
export {};
