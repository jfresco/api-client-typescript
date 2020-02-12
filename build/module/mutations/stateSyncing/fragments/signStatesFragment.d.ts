import { CurrencyAmount } from '../../../queries/currency/fragments';
export interface SignStatesFields {
    message: string;
    blockchain: string;
}
export interface ClientSignedState extends SignStatesFields {
    publicKey: string;
    signature: string;
}
export declare type ClientSignableStates = SignStatesFields[];
export declare type ClientSignedStates = ClientSignedState[];
export declare const SIGN_STATES_FRAGMENT: any;
export interface State extends ClientSignedState {
    nonce: number;
    address: string;
    balance: CurrencyAmount;
    message: string;
    blockchain: string;
}
export declare type States = State[];
