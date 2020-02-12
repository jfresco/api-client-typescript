export declare type SubscribeToFn = () => () => void;
export declare type DateTime = string;
export declare type PaginationCursor = string;
export interface Signature {
    publicKey: string;
    signedDigest: string;
}
export declare type Payload = Record<string, any>;
export interface PayloadWithTimestamp extends Payload {
    timestamp: number;
}
export declare type InputPayload = Record<string, any>;
export declare enum Blockchain {
    NEO = "neo",
    ETH = "eth"
}
export declare enum Period {
    DAY = "DAY",
    MONTH = "MONTH",
    SEMESTER = "SEMESTER",
    WEEK = "WEEK"
}
