"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("../currency/fragments");
exports.LIST_ACCOUNT_VOLUMES = graphql_tag_1.default `
  query listAccountVolumes(
    $payload: ListAccountVolumesParams!
    $signature: Signature!
  ) {
    listAccountVolumes(payload: $payload, signature: $signature)
      @connection(key: "listAccountVolumes") {
      volumes {
        ...currencyAccountVolumeFields
      }
    }
  }
  ${fragments_1.CURRENCY_ACCOUNT_VOLUME_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFjY291bnRWb2x1bWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3F1ZXJpZXMvYWNjb3VudC9saXN0QWNjb3VudFZvbHVtZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBNkI7QUFFN0IscURBQXdFO0FBRTNELFFBQUEsb0JBQW9CLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0lBWW5DLDRDQUFnQztDQUNuQyxDQUFBIn0=