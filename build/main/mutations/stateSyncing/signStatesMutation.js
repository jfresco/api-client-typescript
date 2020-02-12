"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.SIGN_STATES_MUTATION = graphql_tag_1.default `
  mutation signStates($payload: SignStatesParams!, $signature: String!) {
    signStates(payload: $payload, signature: $signature) {
      states {
        message
        blockchain
        nonce
        address
        balance {
          amount
          currency
        }
      }
      recycledOrders {
        message
        blockchain
      }
      serverSignedStates {
        message
        blockchain
      }
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblN0YXRlc011dGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9zdGF0ZVN5bmNpbmcvc2lnblN0YXRlc011dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBU2hCLFFBQUEsb0JBQW9CLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QnRDLENBQUEifQ==