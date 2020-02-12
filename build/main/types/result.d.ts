export interface OkResult<T> {
    type: 'ok';
    data?: T;
}
export interface FailResult {
    type: 'error';
    message: string;
}
export declare type Result<T> = OkResult<T> | FailResult;
