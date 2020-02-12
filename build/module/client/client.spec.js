import * as Nash from './client';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L2NsaWVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sVUFBVSxDQUFBO0FBV2hDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixNQUFNLEVBQUUseUNBQXlDO0lBQ2pELE1BQU0sRUFBRSxpQ0FBaUM7SUFDekMsS0FBSyxFQUFFLEtBQUs7Q0FDYixDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNyQiw2RUFBNkU7SUFDN0UsRUFBRSxDQUFDLHlFQUF5RSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtRQUN6Rix5REFBeUQ7UUFDekQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQTtRQUNELE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQXNCLENBQUMsQ0FBZSxDQUFBO1FBQ3pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6QiwrREFBK0QsQ0FDaEUsQ0FBQTtRQUNELElBQUksRUFBRSxDQUFBO0lBQ1IsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLDZFQUE2RTtJQUM3RSxFQUFFLENBQUMsNkVBQTZFLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBQyxFQUFFO1FBQzdGLHlEQUF5RDtRQUN6RCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDNUIsTUFBTSxN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