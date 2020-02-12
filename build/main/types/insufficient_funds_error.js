"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InsufficientFundsError extends Error {
    constructor(message, payload) {
        // 'Error' breaks prototype chain here
        super(message);
        this.payload = payload;
        Object.setPrototypeOf(this, InsufficientFundsError.prototype);
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdWZmaWNpZW50X2Z1bmRzX2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3R5cGVzL2luc3VmZmljaWVudF9mdW5kc19lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsc0JBQXVCLFNBQVEsS0FBSztJQUUvQyxZQUFZLE9BQWdCLEVBQUUsT0FBYTtRQUN6QyxzQ0FBc0M7UUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFFdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDL0QsQ0FBQztDQUNGO0FBVEQsd0RBU0MifQ==