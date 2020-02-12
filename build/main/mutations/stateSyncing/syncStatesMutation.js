"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.SYNC_STATES_MUTATION = graphql_tag_1.default `
  mutation syncStates($payload: SyncStatesParams!, $signature: String!) {
    syncStates(payload: $payload, signature: $signature) {
      result
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY1N0YXRlc011dGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211dGF0aW9ucy9zdGF0ZVN5bmNpbmcvc3luY1N0YXRlc011dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQTZCO0FBSWhCLFFBQUEsb0JBQW9CLEdBQUcscUJBQUcsQ0FBQTs7Ozs7O0NBTXRDLENBQUEifQ==