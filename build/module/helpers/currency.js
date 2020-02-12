/**
 *
 * @param amount
 * @param currency
 */
export function createCurrencyAmount(amount, currency) {
    return {
        amount,
        currency
    };
}
/**
 *
 * @param amount
 * @param currencyA
 * @param currencyB
 */
export function createCurrencyPrice(amount, currencyA, currencyB) {
    return {
        amount,
        currencyA,
        currencyB
    };
}
/*
  Input: '1.0e-6' | '0.000001'
  Output: 6
 */
export const getPrecisionFromMarketString = (exp) => {
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
export function normalizeAmountForMarketPrecision(amount, tradeSize) {
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
export function normalizeAmountForMarket(amount, market) {
    let precision = getPrecisionFromMarketString(market.minTradeIncrement);
    let minAmount = market.minTradeSize;
    if (amount.currency === market.bUnit) {
        precision = getPrecisionFromMarketString(market.minTradeIncrementB);
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
export function normalizePriceForMarket(price, market) {
    let minTradeIncrementToUse = market.minTradeIncrement;
    if (price.currencyA === market.bUnit) {
        minTradeIncrementToUse = market.minTradeIncrementB;
    }
    const precision = getPrecisionFromMarketString(minTradeIncrementToUse);
    let normalizedPrice = normalizeAmountForMarketPrecision(price.amount, precision);
    if (normalizedPrice.substr(-1) === '.') {
        normalizedPrice = normalizedPrice.slice(0, -1);
    }
    return createCurrencyPrice(normalizedPrice, price.currencyA, price.currencyB);
}
export function mapMarketsForNashProtocol(markets) {
    const marketData = {};
    for (const it of Object.keys(markets)) {
        const market = markets[it];
        marketData[market.name] = {
            minTickSize: getPrecisionFromMarketString(market.minTickSize),
            minTradeSize: getPrecisionFromMarketString(market.minTradeSize),
            minTradeIncrementA: getPrecisionFromMarketString(market.minTradeIncrement),
            minTradeIncrementB: getPrecisionFromMarketString(market.minTradeIncrementB)
        };
    }
    return marketData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9jdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxNQUFjLEVBQ2QsUUFBd0I7SUFFeEIsT0FBTztRQUNMLE1BQU07UUFDTixRQUFRO0tBQ1QsQ0FBQTtBQUNILENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsTUFBYyxFQUNkLFNBQXlCLEVBQ3pCLFNBQXlCO0lBRXpCLE9BQU87UUFDTCxNQUFNO1FBQ04sU0FBUztRQUNULFNBQVM7S0FDVixDQUFBO0FBQ0gsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDbEUsSUFBSSxXQUFXLEdBQVcsR0FBRyxDQUFBO0lBQzdCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN6QixvREFBb0Q7UUFDcEQsTUFBTSxXQUFXLEdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDaEMsdUNBQXVDO1FBQ3ZDLFdBQVcsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFBO0tBQy9CO0lBRUQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7SUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsaUNBQWlDLENBQy9DLE1BQWMsRUFDZCxTQUFpQjtJQUVqQixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFD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