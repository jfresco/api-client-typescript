import { SignStatesFields } from './fragments';
export declare const SYNC_STATES_MUTATION: any;
export interface SyncStatesData {
    syncStates: {
        result: boolean;
    };
}
export interface SyncStatesVariables {
    payload: {
        timestamp: number;
        serverSignedStates: SignStatesFields[];
    };
    publicKey: string;
    signature: string;
}
