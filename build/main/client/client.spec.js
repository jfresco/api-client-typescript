"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nash = __importStar(require("./client"));
const client = new Nash.Client({
    apiURI: 'https://app.sandbox.nash.io/api/graphql',
    casURI: 'https://app.sandbox.nash.io/api',
    debug: false
});
describe('login', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without valid Params', async (done) => {
        // expect to receive an object with property type = Error
        const loginData = {
            email: undefined,
            password: undefined
        };
        const market = (await client.login(loginData));
        expect(market.type).toBe('error');
        expect(market.message).toBe('email must be of type string\npassword must be of type string');
        done();
    });
});
describe('getTicker', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const marketName = undefined;
        const market = (await client.getTicker(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const marketName = 1234;
        const market = (await client.getTicker(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
});
describe('getOrderBook', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const marketName = undefined;
        const market = (await client.getOrderBook(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const marketName = 1234;
        const market = (await client.getOrderBook(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
});
describe('listTrades', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const marketName = undefined;
        const market = (await client.listTrades({ marketName }));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const marketName = 1234;
        const market = (await client.listTrades({ marketName }));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
});
describe('listCandles', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const marketName = undefined;
        const market = (await client.listCandles({ marketName }));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const marketName = 1234;
        const market = (await client.listCandles({ marketName }));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
});
describe('getMarket', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const marketName = undefined;
        const market = (await client.getMarket(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const marketName = 1234;
        const market = (await client.getMarket(marketName));
        expect(market.type).toBe('error');
        expect(market.message).toBe('marketName must be of type string');
        done();
    });
});
describe('listAccountBalances', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const ignoreLowBalance = undefined;
        const balances = (await client.listAccountBalances(ignoreLowBalance));
        expect(balances.type).toBe('error');
        expect(balances.message).toBe('ignoreLowBalance must be of type boolean');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const ignoreLowBalance = undefined;
        const balances = (await client.listAccountBalances(ignoreLowBalance));
        expect(balances.type).toBe('error');
        expect(balances.message).toBe('ignoreLowBalance must be of type boolean');
        done();
    });
});
describe('getDepositAddress', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const currency = undefined;
        const depositAddress = (await client.getDepositAddress(currency));
        expect(depositAddress.type).toBe('error');
        expect(depositAddress.message).toBe('currency must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const address = 1234;
        const depositAddress = (await client.getDepositAddress(address));
        expect(depositAddress.type).toBe('error');
        expect(depositAddress.message).toBe('currency must be of type string');
        done();
    });
});
describe('getAccountPortfolio', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const fiatSymbol = undefined;
        const period = undefined;
        const depositAddress = (await client.getAccountPortfolio({
            fiatSymbol,
            period
        }));
        expect(depositAddress.type).toBe('error');
        expect(depositAddress.message).toBe('fiatSymbol must be of type string\nperiod must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const fiatSymbol = 1234;
        const period = 1234;
        const depositAddress = (await client.getAccountPortfolio({
            fiatSymbol,
            period
        }));
        expect(depositAddress.type).toBe('error');
        expect(depositAddress.message).toBe('fiatSymbol must be of type string\nperiod must be of type string');
        done();
    });
});
describe('getMovement', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const movementID = undefined;
        const movement = (await client.getMovement(movementID));
        expect(movement.type).toBe('error');
        expect(movement.message).toBe('movementID must be of type number');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const movementID = 'cuca';
        const movement = (await client.getMovement(movementID));
        expect(movement.type).toBe('error');
        expect(movement.message).toBe('movementID must be of type number');
        done();
    });
});
describe('getAccountBalance', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const currency = undefined;
        const accountBalance = (await client.getAccountBalance(currency));
        expect(accountBalance.type).toBe('error');
        expect(accountBalance.message).toBe('currency must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const currency = 5678;
        const accountBalance = (await client.getAccountBalance(currency));
        expect(accountBalance.type).toBe('error');
        expect(accountBalance.message).toBe('currency must be of type string');
        done();
    });
});
describe('getAccountOrder', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const orderID = undefined;
        const accountOrder = (await client.getAccountOrder(orderID));
        expect(accountOrder.type).toBe('error');
        expect(accountOrder.message).toBe('orderID must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const orderID = 5678;
        const accountOrder = (await client.getAccountOrder(orderID));
        expect(accountOrder.type).toBe('error');
        expect(accountOrder.message).toBe('orderID must be of type string');
        done();
    });
});
describe('getOrdersForMovement', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const asset = undefined;
        const ordersFormove = (await client.getAccountOrder(asset));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('orderID must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const asset = 1234;
        const ordersFormove = (await client.getAccountOrder(asset));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('orderID must be of type string');
        done();
    });
});
describe('placeLimitOrder', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const allowTaker = undefined;
        const amount = undefined;
        const buyOrSell = undefined;
        const cancellationPolicy = undefined;
        const limitPrice = undefined;
        const marketName = undefined;
        const ordersFormove = (await client.placeLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe(`allowTaker must be of type boolean\namount must be of type object\nlimitPrice must be of type object\ncancellationPolicy must be of type string\nbuyOrSell must be of type string\nmarketName must be of type string`);
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const allowTaker = 'alalal';
        const amount = 'alalla';
        const buyOrSell = 1234;
        const cancellationPolicy = 12343;
        const limitPrice = 1234;
        const marketName = 1234;
        const ordersFormove = (await client.placeLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe(`allowTaker must be of type boolean\namount must be of type object\nlimitPrice must be of type object\ncancellationPolicy must be of type string\nbuyOrSell must be of type string\nmarketName must be of type string`);
        done();
    });
});
describe('placeMarketOrder', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const amount = undefined;
        const buyOrSell = undefined;
        const marketName = undefined;
        const ordersFormove = (await client.placeMarketOrder(amount, buyOrSell, marketName));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('buyOrSell must be of type string\nmarketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const amount = 1234;
        const buyOrSell = 1234;
        const marketName = 1234;
        const ordersFormove = (await client.placeMarketOrder(amount, buyOrSell, marketName));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('buyOrSell must be of type string\nmarketName must be of type string');
        done();
    });
});
describe('placeStopLimitOrder', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const allowTaker = undefined;
        const amount = undefined;
        const buyOrSell = undefined;
        const cancellationPolicy = undefined;
        const limitPrice = undefined;
        const marketName = undefined;
        const stopPrice = undefined;
        const ordersFormove = (await client.placeStopLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, stopPrice));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('allowTaker must be of type boolean\nbuyOrSell must be of type string\nmarketName must be of type string\ncancellationPolicy must be of type string\ncancelAt must be of type undefined');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const allowTaker = 'alalal';
        const amount = 'alalla';
        const buyOrSell = 1234;
        const cancellationPolicy = 12343;
        const limitPrice = 1234;
        const marketName = 1234;
        const stopPrice = 1234;
        const ordersFormove = (await client.placeStopLimitOrder(allowTaker, amount, buyOrSell, cancellationPolicy, limitPrice, marketName, stopPrice));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('allowTaker must be of type boolean\nbuyOrSell must be of type string\nmarketName must be of type string\ncancellationPolicy must be of type string\ncancelAt must be of type undefined');
        done();
    });
});
describe('placeStopMarketOrder', () => {
    // should return an error trying to call the function without mandatory Param
    it('should return an error trying to call the function without mandatory Params', async (done) => {
        // expect to receive an object with property type = Error
        const amount = undefined;
        const buyOrSell = undefined;
        const marketName = undefined;
        const stopPrice = undefined;
        const ordersFormove = (await client.placeStopMarketOrder(amount, buyOrSell, marketName, stopPrice));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('amount must be of type object\nstopPrice must be of type object\nbuyOrSell must be of type string\nmarketName must be of type string');
        done();
    });
    // should return an error when trying to call function with an invalid mandatory Param
    it('should return an error trying to call the function with invalid mandatory Param', async (done) => {
        // expect to receive an object with property type = error
        const amount = 1234;
        const buyOrSell = 1234;
        const marketName = 1234;
        const stopPrice = 1234;
        const ordersFormove = (await client.placeStopMarketOrder(amount, buyOrSell, marketName, stopPrice));
        expect(ordersFormove.type).toBe('error');
        expect(ordersFormove.message).toBe('amount must be of type object\nstopPrice must be of type object\nbuyOrSell must be of type string\nmarketName must be of type string');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L2NsaWVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLCtDQUFnQztBQVdoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsTUFBTSxFQUFFLHlDQUF5QztJQUNqRCxNQUFNLEVBQUUsaUNBQWlDO0lBQ3pDLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDckIsNkVBQTZFO0lBQzdFLEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFDLEVBQUU7UUFDekYseURBQXlEO1FBQ3pELE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRSxTQUFTO1NBQ3BCLENBQUE7UUFDRCxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFzQixDQUFDLENBQWUsQ0FBQTtRQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDekIsK0RBQStELENBQ2hFLENBQUE7UUFDRCxJQUFJLEVBQUUsQ0FBQTtJQUNSLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN6Qiw2RUFBNkU7SUFDN0UsRUFBRSxDQUFDLDZFQUE2RSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtRQUM3Rix5REFBeUQ7UUFDekQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzVCLE1BQU0sTUFBTSxHQUFHLENBQUMs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