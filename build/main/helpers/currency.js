"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param amount
 * @param currency
 */
function createCurrencyAmount(amount, currency) {
    return {
        amount,
        currency
    };
}
exports.createCurrencyAmount = createCurrencyAmount;
/**
 *
 * @param amount
 * @param currencyA
 * @param currencyB
 */
function createCurrencyPrice(amount, currencyA, currencyB) {
    return {
        amount,
        currencyA,
        currencyB
    };
}
exports.createCurrencyPrice = createCurrencyPrice;
/*
  Input: '1.0e-6' | '0.000001'
  Output: 6
 */
exports.getPrecisionFromMarketString = (exp) => {
    let stringValue = exp;
    if (exp.indexOf('e') > -1) {
        // coerce to number to deal with scientific notation
        const numberValue = +exp;
        // now back to string. this is so dirty
        stringValue = numberValue + '';
    }
    const split = stringValue.split('.');
    if (split.length === 1) {
        return 0;
    }
    return split[1].length;
};
/**
 * Normalizes the given amount based on the given trade size.
 *
 * @param amount
 * @param tradeSize
 */
function normalizeAmountForMarketPrecision(amount, tradeSize) {
    const amountSplit = amount.split('.');
    if (tradeSize === 0) {
        if (amountSplit.length === 1) {
            return amountSplit[0];
        }
        else {
            throw new Error(`to many decimals given expected: ${tradeSize} got ${amountSplit[1].length}`);
        }
    }
    if (amountSplit.length === 1) {
        const head = amountSplit[0];
        const tail = ''.padStart(tradeSize, '0');
        return head + '.' + tail;
    }
    if (amountSplit[1].length < tradeSize) {
        const head = amountSplit[0];
        const tail = ''.padStart(tradeSize - amountSplit[1].length, '0');
        return head + '.' + amountSplit[1] + tail;
    }
    if (amountSplit[1].length > tradeSize) {
        return amountSplit[0] + '.' + amountSplit[1].substring(0, tradeSize);
    }
    return amount;
}
exports.normalizeAmountForMarketPrecision = normalizeAmountForMarketPrecision;
function normalizeAmountForMarket(amount, market) {
    let precision = exports.getPrecisionFromMarketString(market.minTradeIncrement);
    let minAmount = market.minTradeSize;
    if (amount.currency === market.bUnit) {
        precision = exports.getPrecisionFromMarketString(market.minTradeIncrementB);
        minAmount = market.minTradeSizeB;
    }
    let normalizedAmount = normalizeAmountForMarketPrecision(amount.amount, precision);
    if (normalizedAmount.substr(-1) === '.') {
        normalizedAmount = normalizedAmount.slice(0, -1);
    }
    if (parseFloat(normalizedAmount) < parseFloat(minAmount)) {
        console.warn(`Amount ${normalizedAmount} for currency ${amount.currency} is less than min amount for market: ${minAmount}.  Defaulting to min amount`);
        normalizedAmount = normalizeAmountForMarketPrecision(minAmount + '', precision);
    }
    return createCurrencyAmount(normalizedAmount, amount.currency);
}
exports.normalizeAmountForMarket = normalizeAmountForMarket;
function normalizePriceForMarket(price, market) {
    let minTradeIncrementToUse = market.minTradeIncrement;
    if (price.currencyA === market.bUnit) {
        minTradeIncrementToUse = market.minTradeIncrementB;
    }
    const precision = exports.getPrecisionFromMarketString(minTradeIncrementToUse);
    let normalizedPrice = normalizeAmountForMarketPrecision(price.amount, precision);
    if (normalizedPrice.substr(-1) === '.') {
        normalizedPrice = normalizedPrice.slice(0, -1);
    }
    return createCurrencyPrice(normalizedPrice, price.currencyA, price.currencyB);
}
exports.normalizePriceForMarket = normalizePriceForMarket;
function mapMarketsForNashProtocol(markets) {
    const marketData = {};
    for (const it of Object.keys(markets)) {
        const market = markets[it];
        marketData[market.name] = {
            minTickSize: exports.getPrecisionFromMarketString(market.minTickSize),
            minTradeSize: exports.getPrecisionFromMarketString(market.minTradeSize),
            minTradeIncrementA: exports.getPrecisionFromMarketString(market.minTradeIncrement),
            minTradeIncrementB: exports.getPrecisionFromMarketString(market.minTradeIncrementB)
        };
    }
    return marketData;
}
exports.mapMarketsForNashProtocol = mapMarketsForNashProtocol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9jdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BOzs7O0dBSUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FDbEMsTUFBYyxFQUNkLFFBQXdCO0lBRXhCLE9BQU87UUFDTCxNQUFNO1FBQ04sUUFBUTtLQUNULENBQUE7QUFDSCxDQUFDO0FBUkQsb0RBUUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLG1CQUFtQixDQUNqQyxNQUFjLEVBQ2QsU0FBeUIsRUFDekIsU0FBeUI7SUFFekIsT0FBTztRQUNMLE1BQU07UUFDTixTQUFTO1FBQ1QsU0FBUztLQUNWLENBQUE7QUFDSCxDQUFDO0FBVkQsa0RBVUM7QUFFRDs7O0dBR0c7QUFDVSxRQUFBLDRCQUE0QixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDbEUsSUFBSSxXQUFXLEdBQVcsR0FBRyxDQUFBO0lBQzdCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN6QixvREFBb0Q7UUFDcEQsTUFBTSxXQUFXLEdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDaEMsdUNBQXVDO1FBQ3ZDLFdBQVcsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFBO0tBQy9CO0lBRUQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7SUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixpQ0FBaUMsQ0FDL0MsTUFBYyxFQUNkLFNBQWlCO0lBRWpCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENB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