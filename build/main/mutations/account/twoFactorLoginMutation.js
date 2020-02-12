"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.USER_2FA_LOGIN_MUTATION = graphql_tag_1.default `
  mutation twoFactorLogin($code: String!) {
    twoFactorLogin(twoFa: $code) {
      account {
        creatingAccount
        email
        encryptedSecretKey
        encryptedSecretKeyTag
        encryptedSecretKeyNonce
        id
        loginErrorCount
        twoFactor
        twoFactorErrorCount
        verified
        wallets {
          address
          blockchain
          chainIndex
          publicKey
        }
      }
      serverEncryptionKey
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvRmFjdG9yTG9naW5NdXRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvYWNjb3VudC90d29GYWN0b3JMb2dpbk11dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBR2hCLFFBQUEsdUJBQXVCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0J6QyxDQUFBIn0=