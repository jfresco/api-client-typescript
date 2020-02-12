import gql from 'graphql-tag';
export const USER_2FA_LOGIN_MUTATION = gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvRmFjdG9yTG9naW5NdXRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tdXRhdGlvbnMvYWNjb3VudC90d29GYWN0b3JMb2dpbk11dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQTtBQUc3QixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCekMsQ0FBQSJ9