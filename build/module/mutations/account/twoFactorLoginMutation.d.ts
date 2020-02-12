import { TwoFactorLoginAccount } from 'types';
export declare const USER_2FA_LOGIN_MUTATION: any;
export interface TwoFactorLoginResponse {
    account: TwoFactorLoginAccount;
    serverEncryptionKey: string;
}
