import { CryptoCurrency } from 'constants/currency';
import { DateTime, CurrencyAmount } from '../../../types';
export declare enum MovementType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER"
}
export declare enum MovementStatus {
    CREATED = "CREATED",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    PENDING = "PENDING"
}
export interface AddMovement {
    address: string;
    confirmations: number;
    id: number;
    currency: CryptoCurrency;
    quantity: CurrencyAmount;
    receivedAt: DateTime;
    status: MovementStatus;
    publicKey: string;
    signature: string;
}
export declare const ADD_MOVEMENT_FRAGMENT: any;
