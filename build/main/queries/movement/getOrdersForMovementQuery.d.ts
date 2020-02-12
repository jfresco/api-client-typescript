import { SyncState } from '@neon-exchange/nash-protocol';
export declare const GET_ORDERS_FOR_MOVEMENT_QUERY: any;
export interface OrdersForMovementData {
    recycledOrders: SyncState[];
    assetNonce: number;
}
export interface GetOrdersForMovementData {
    getOrdersForMovement: {
        recycledOrders: SyncState[];
        assetNonce: number;
    };
}
