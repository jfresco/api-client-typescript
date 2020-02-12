"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingNonceError extends Error {
    constructor(message, payload) {
        // 'Error' breaks prototype chain here
        super(message);
        this.payload = payload;
        Object.setPrototypeOf(this, MissingNonceError.prototype);
    }
}
exports.MissingNonceError = MissingNonceError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2luZ19ub25jZV9lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90eXBlcy9taXNzaW5nX25vbmNlX2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxpQkFBa0IsU0FBUSxLQUFLO0lBRzFDLFlBQVksT0FBZ0IsRUFBRSxPQUFhO1FBQ3pDLHNDQUFzQztRQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0NBQ0Y7QUFWRCw4Q0FVQyJ9