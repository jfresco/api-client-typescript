import { CryptoCurrency, FiatCurrency } from '../../../constants/currency';
export interface FiatCurrencyAmount {
    amount: string;
    currency: FiatCurrency;
}
export interface CryptoCurrencyAmount {
    amount: string;
    currency: CryptoCurrency;
}
export declare type CurrencyAmount = CryptoCurrencyAmount | FiatCurrencyAmount;
export declare const CURRENCY_AMOUNT_FRAGMENT: any;
