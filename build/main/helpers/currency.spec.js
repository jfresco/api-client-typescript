"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const currency_1 = require("../constants/currency");
const markets_default_1 = require("../helpers/markets.default");
const neo_gas = markets_default_1.defaultMarkets.neo_gas;
// neo_gas: {
//   aUnit: 'neo',
//   aUnitPrecision: 5,
//   bUnit: 'gas',
//   bUnitPrecision: 5,
//   minTickSize: '0.01',
//   minTradeIncrement: '0.001',
//   minTradeIncrementB: '0.01',
//   minTradeSize: '0.50000',
//   minTradeSizeB: '1.00000',
//   name: 'neo_gas',
//   priceGranularity: 12,
//   status: 'RUNNING'
// },
test('normalizes the amount according to the given trade size', async () => {
    expect(helpers_1.normalizeAmountForMarketPrecision('10', 2)).toBe('10.00');
    expect(helpers_1.normalizeAmountForMarketPrecision('10.001', 2)).toBe('10.00');
    expect(helpers_1.normalizeAmountForMarketPrecision('10.001', 6)).toBe('10.001000');
});
test('get precision works as expected', async () => {
    expect(helpers_1.getPrecisionFromMarketString('0.01')).toBe(2);
    expect(helpers_1.getPrecisionFromMarketString('0.001')).toBe(3);
    expect(helpers_1.getPrecisionFromMarketString('10')).toBe(0);
    expect(helpers_1.getPrecisionFromMarketString('1')).toBe(0);
    expect(helpers_1.getPrecisionFromMarketString('0')).toBe(0);
    expect(helpers_1.getPrecisionFromMarketString('0.50000')).toBe(5);
    expect(helpers_1.getPrecisionFromMarketString('1.0e-6')).toBe(6);
    expect(helpers_1.getPrecisionFromMarketString('1.0e+6')).toBe(0);
    expect(helpers_1.getPrecisionFromMarketString('125.2569782548')).toBe(10);
});
test('normalizes currency amount', async () => {
    let currencyAmount = helpers_1.createCurrencyAmount('1', currency_1.CryptoCurrency.NEO);
    let result = helpers_1.normalizeAmountForMarket(currencyAmount, neo_gas);
    expect(result.amount).toBe('1.000');
    currencyAmount = helpers_1.createCurrencyAmount('50', currency_1.CryptoCurrency.GAS);
    result = helpers_1.normalizeAmountForMarket(currencyAmount, neo_gas);
    expect(result.amount).toBe('50.00');
    // lower than min amount for gas should be set to min amount
    currencyAmount = helpers_1.createCurrencyAmount('.1', currency_1.CryptoCurrency.GAS);
    result = helpers_1.normalizeAmountForMarket(currencyAmount, neo_gas);
    expect(result.amount).toBe('1.00');
    // same for neo
    currencyAmount = helpers_1.createCurrencyAmount('.1', currency_1.CryptoCurrency.NEO);
    result = helpers_1.normalizeAmountForMarket(currencyAmount, neo_gas);
    expect(result.amount).toBe('0.500');
});
test('normalizes currency price', async () => {
    // use minTradeIncrement ( which is 0.001)
    let currencyPrice = helpers_1.createCurrencyPrice('0.01', currency_1.CryptoCurrency.NEO, currency_1.CryptoCurrency.GAS);
    let result = helpers_1.normalizePriceForMarket(currencyPrice, neo_gas);
    expect(result.amount).toBe('0.010');
    // for gas it is 0.01
    // so normalizePriceForMarket needs to use minTradeIncrementB
    currencyPrice = helpers_1.createCurrencyPrice('0.01', currency_1.CryptoCurrency.GAS, currency_1.CryptoCurrency.NEO);
    result = helpers_1.normalizePriceForMarket(currencyPrice, neo_gas);
    expect(result.amount).toBe('0.01');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2N1cnJlbmN5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FPbUI7QUFDbkIsb0RBQXNEO0FBRXRELGdFQUEyRDtBQUUzRCxNQUFNLE9BQU8sR0FBRyxnQ0FBYyxDQUFDLE9BQWlCLENBQUE7QUFFaEQsYUFBYTtBQUNiLGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2Qix5QkFBeUI7QUFDekIsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQiwwQkFBMEI7QUFDMUIsc0JBQXNCO0FBQ3RCLEtBQUs7QUFFTCxJQUFJLENBQUMseURBQXlELEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDekUsTUFBTSxDQUFDLDJDQUFpQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNoRSxNQUFNLENBQUMsMkNBQWlDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3BFLE1BQU0sQ0FBQywyQ0FBaUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDMUUsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakQsTUFBTSxDQUFDLHNDQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BELE1BQU0sQ0FBQyxzQ0FBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyRCxNQUFN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