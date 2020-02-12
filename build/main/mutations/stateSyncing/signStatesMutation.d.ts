import { SignStatesFields, States, ClientSignedStates, ClientSignableStates } from './fragments';
export declare const SIGN_STATES_MUTATION: any;
export interface GetStatesData {
    recycledOrders: ClientSignableStates;
    states: States;
    serverSignedStates: SignStatesFields[];
}
export interface GetStatesVariables {
    payload: {
        timestamp: number;
    };
    publicKey: string;
    signature: string;
}
export interface SignStatesData {
    signStates: {
        serverSignedStates: SignStatesFields[];
        states: States;
        recycledOrders: SignStatesFields[];
    };
}
export interface SignStatesVariables {
    payload: {
        timestamp: number;
        clientSignedStates: ClientSignedStates;
        signedRecycledOrders: ClientSignedStates;
    };
    publicKey: string;
    signature: string;
}
