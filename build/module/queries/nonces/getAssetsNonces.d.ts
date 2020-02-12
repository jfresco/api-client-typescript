import { CryptoCurrency } from '../../constants/currency';
export declare const GET_ASSETS_NONCES_QUERY: any;
export interface AssetsNoncesData {
    asset: CryptoCurrency;
    nonces: number[];
}
export interface GetAssetsNoncesData extends Array<AssetsNoncesData> {
}
