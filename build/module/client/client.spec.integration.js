// These tests are commented out because they are integration tests
// that cannot be used currently by anyone.
// Because of this, nobody is running any tests on this project.
// import { Client } from '.'
// import { CryptoCurrency } from '../constants/currency'
// import { createCurrencyAmount, createCurrencyPrice } from '../helpers'
// import { CAS_URL, GQL_URL } from '../config'
// import { OrderBuyOrSell, OrderStatus, OrderCancellationPolicy } from '../types'
// const client = new Client({
//   casURI: CAS_URL,
//   apiURI: GQL_URL
// })
// beforeAll(async () => {
//   const email = 'test@nash.io'
//   const password =
//     'af0782580bb2ec65b72cb184cf729dd16dfd5669ae247c64aa8d6d01b6ed8a34'
//   await client.login(email, password)
// })
// test('successfull logs in a user', async () => {
//   const email = 'test@nash.io'
//   const password =
//     'af0782580bb2ec65b72cb184cf729dd16dfd5669ae247c64aa8d6d01b6ed8a34'
//   await expect(client.login(email, password)).resolves.toBeTruthy
// })
// test('unsuccessfully logs in a user with invalid credentials', async () => {
//   const email = 'test_invalid@nash.io'
//   const password =
//     'af0782580bb2ec65b72cb184cf729dd16dfd5669ae247c64aa8d6d01b6ed8a34'
//   await expect(client.login(email, password)).rejects.toThrow(Error)
// })
// test('get ticker', async () => {
//   const ticker = await client.getTicker('neo_gas')
//   console.log(ticker)
// })
// test('get orderbook', async () => {
//   const orderBook = await client.getOrderBook('neo_gas')
//   console.log(orderBook)
// })
// test('list trades', async () => {
//   const tradeHistory = await client.listTrades('neo_gas')
//   console.log(tradeHistory)
// })
// test('list tickers', async () => {
//   const tickers = await client.listTickers()
//   expect(tickers.length).toBeGreaterThan(0)
// })
// test('list candles', async () => {
//   const candleRange = await client.listCandles('neo_eth')
//   expect(candleRange.candles).toHaveLength(0)
// })
// test('list all available markets', async () => {
//   const markets = await client.listMarkets()
//   expect(markets).toHaveLength(12)
// })
// test('get a valid market', async () => {
//   const market = await client.getMarket('eth_neo')
//   expect(market).toBeDefined()
// })
// test('get a non-existing market throws error', async () => {
//   await expect(client.getMarket('ETH_NASH')).rejects.toThrow(Error)
// })
// test('list account transactions', async () => {
//   const accountTransactionResponse = await client.listAccountTransactions()
//   expect(accountTransactionResponse.transactions).toHaveLength(0)
// })
// test('list account balances', async () => {
//   const accountBalances = await client.listAccountBalances()
//   expect(accountBalances.length).toBeGreaterThan(0)
// })
// test('get deposit address', async () => {
//   const depositAddress = await client.getDepositAddress(CryptoCurrency.ETH)
//   expect(depositAddress.currency).toBe('eth')
//   expect(depositAddress.address).toBeDefined()
// })
// test('get account portfolio', async () => {
//   const accountPortfolio = await client.getAccountPortfolio()
//   expect(accountPortfolio.balances.length).toBeGreaterThan(0)
// })
// test('get movement that not exist throws', async () => {
//   await expect(client.getMovement(1)).rejects.toThrow(Error)
// })
// test('get account balance', async () => {
//   const accountBalance = await client.getAccountBalance(CryptoCurrency.GAS)
//   console.log(accountBalance)
//   expect(accountBalance.available.amount).toBeDefined()
// })
// test('get account order that not exist throws', async () => {
//   await expect(client.getAccountOrder('1')).rejects.toThrow(Error)
// })
// test('list account volumes', async () => {
//   const accountVolumes = await client.listAccountVolumes()
//   expect(accountVolumes.volumes).toHaveLength(2)
// })
// test('placing an order with not enough funds throws an error', async () => {
//   await expect(
//     client.placeLimitOrder(
//       false,
//       createCurrencyAmount('100000000000000000000.00', CryptoCurrency.NEO),
//       OrderBuyOrSell.SELL,
//       OrderCancellationPolicy.GOOD_TIL_CANCELLED,
//       createCurrencyPrice('0.010000', CryptoCurrency.GAS, CryptoCurrency.NEO),
//       'neo_gas'
//     )
//   ).rejects.toThrow(Error)
// })
// test('place limit order', async () => {
//   const orderPlaced = await client.placeLimitOrder(
//     false,
//     createCurrencyAmount('1.00', CryptoCurrency.NEO),
//     OrderBuyOrSell.SELL,
//     OrderCancellationPolicy.GOOD_TIL_CANCELLED,
//     createCurrencyPrice('0.010000', CryptoCurrency.GAS, CryptoCurrency.NEO),
//     'neo_gas'
//   )
//   expect(orderPlaced.status).toBe(OrderStatus.PENDING)
// })
// test('place market order', async () => {
//   const orderPlaced = await client.placeMarketOrder(
//     createCurrencyAmount('1.00', CryptoCurrency.NEO),
//     OrderBuyOrSell.SELL,
//     'neo_gas'
//   )
//   expect(orderPlaced.status).toBe(OrderStatus.PENDING)
// })
// test('place stop limit order', async () => {
//   const orderPlaced = await client.placeStopLimitOrder(
//     false,
//     createCurrencyAmount('1.00', CryptoCurrency.NEO),
//     OrderBuyOrSell.BUY,
//     OrderCancellationPolicy.GOOD_TIL_CANCELLED,
//     createCurrencyPrice('0.010000', CryptoCurrency.GAS, CryptoCurrency.NEO),
//     'neo_gas',
//     createCurrencyPrice('0.020000', CryptoCurrency.GAS, CryptoCurrency.NEO)
//   )
//   expect(orderPlaced.status).toBe(OrderStatus.PENDING)
// })
// test('place stop market order', async () => {
//   const orderPlaced = await client.placeStopMarketOrder(
//     createCurrencyAmount('2.00', CryptoCurrency.NEO),
//     OrderBuyOrSell.SELL,
//     'neo_gas',
//     createCurrencyPrice('1.00', CryptoCurrency.GAS, CryptoCurrency.NEO)
//   )
//   expect(orderPlaced.status).toBe(OrderStatus.PENDING)
// })
// test('sign deposit request', async () => {
//   const address = 'd5480a0b20e2d056720709a9538b17119fbe9fd6';
//   const amount = createCurrencyAmount('1.4', CryptoCurrency.ETH);
//   const signMovement = await client.signDepositRequest(address, amount);
//   const movements = await client.listMovements();
//   expect(movements.length).toBeGreaterThan(0);
//   expect(signMovement.movement.status).toBe(MovementStatus.PENDING);
// });
// test('sign withdraw request', async () => {
//   const address = 'd5480a0b20e2d056720709a9538b17119fbe9fd6';
//   const amount = createCurrencyAmount('1.5', CryptoCurrency.ETH);
//   const signMovement = await client.signWithdrawRequest(address, amount);
//   const movements = await client.listMovements();
//   expect(movements.length).toBeGreaterThan(0);
//   expect(signMovement.movement.status).toBe(MovementStatus.PENDING);
// });
// PENDING orders cannot be canceled
// test('cancel order', async () => {
//     const orderPlaced = await client.placeMarketOrder(
//         createCurrencyAmount('1', CryptoCurrency.NEO),
//         OrderBuyOrSell.SELL,
//         'neo_gas'
//     )
//     const cancelledOrder = await client.cancelOrder(orderPlaced.id)
//     console.log(cancelledOrder)
// })
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuaW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L2NsaWVudC5zcGVjLmludGVncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1FQUFtRTtBQUNuRSwyQ0FBMkM7QUFDM0MsZ0VBQWdFO0FBRWhFLDZCQUE2QjtBQUM3Qix5REFBeUQ7QUFDekQseUVBQXlFO0FBQ3pFLCtDQUErQztBQUMvQyxrRkFBa0Y7QUFFbEYsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQixvQkFBb0I7QUFDcEIsS0FBSztBQUVMLDBCQUEwQjtBQUMxQixpQ0FBaUM7QUFDakMscUJBQXFCO0FBQ3JCLHlFQUF5RTtBQUV6RSx3Q0FBd0M7QUFDeEMsS0FBSztBQUVMLG1EQUFtRDtBQUNuRCxpQ0FBaUM7QUFDakMscUJBQXFCO0FBQ3JCLHlFQUF5RTtBQUV6RSxvRUFBb0U7QUFDcEUsS0FBSztBQUVMLCtFQUErRTtBQUMvRSx5Q0FBeUM7QUFDekMscUJBQXFCO0FBQ3JCLHlFQUF5RTtBQUV6RSx1RUFBdUU7QUFDdkUsS0FBSztBQUVMLG1DQUFtQztBQUNuQyxxREFBcUQ7QUFFckQsd0JBQXdCO0FBQ3hCLEtBQUs7QUFFTCxzQ0FBc0M7QUFDdEMsMkRBQTJEO0FBRTNELDJCQUEyQjtBQUMzQixLQUFLO0FBRUwsb0NBQW9DO0FBQ3BDLDREQUE0RDtBQUU1RCw4QkFBOEI7QUFDOUIsS0FBSztBQUVMLHFDQUFxQztBQUNyQywrQ0FBK0M7QUFFL0MsOENBQThDO0FBQzlDLEtBQUs7QUFFTCxxQ0FBcUM7QUFDckMsNERBQTREO0FBRTVELGdEQUFnRDtBQUNoRCxLQUFLO0FBRUwsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyxxQ0FBcUM7QUFDckMsS0FBSztBQUVMLDJDQUEyQztBQUMzQyxxREFBcUQ7QUFDckQsaUNBQWlDO0FBQ2pDLEtBQUs7QUFFTCwrREFBK0Q7QUFDL0Qsc0VBQXNFO0FBQ3RFLEtBQUs7QUFFTCxrREFBa0Q7QUFDbEQsOEVBQThFO0FBQzlFLG9FQUFvRTtBQUNwRSxLQUFLO0FBRUwsOENBQThDO0FBQzlDLCtEQUErRDtBQUMvRCxzREFBc0Q7QUFDdEQsS0FBSztBQUVMLDRDQUE0QztBQUM1Qyw4RUFBOEU7QUFDOUUsZ0RBQWdEO0FBQ2hELGlEQUFpRDtBQUNqRCxLQUFLO0FBRUwsOENBQThDO0FBQzlDLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEUsS0FBSztBQUVMLDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QsS0FBSztBQUVMLDRDQUE0QztBQUM1Qyw4RUFBOEU7QUFDOUUsZ0NBQWdDO0FBQ2hDLDBEQUEwRDtBQUMxRCxLQUFLO0FBRUwsZ0VBQWdFO0FBQ2hFLHFFQUFxRTtBQUNyRSxLQUFLO0FBRUwsNkNBQTZDO0FBQzdDLDZEQUE2RDtBQUM3RCxtREFBbUQ7QUFDbkQsS0FBSztBQUVMLCtFQUErRTtBQUMvRSxrQkFBa0I7QUFDbEIsOEJBQThCO0FBQzlCLGVBQWU7QUFDZiw4RUFBOEU7QUFDOUUsNkJBQTZCO0FBQzdCLG9EQUFvRDtBQUNwRCxpRkFBaUY7QUFDakYsa0JBQWtCO0FBQ2xCLFFBQVE7QUFDUiw2QkFBNkI7QUFDN0IsS0FBSztBQUVMLDBDQUEwQztBQUMxQyxzREFBc0Q7QUFDdEQsYUFBYTtBQUNiLHdEQUF3RDtBQUN4RCwyQkFBMkI7QUFDM0Isa0RBQWtEO0FBQ2xELCtFQUErRTtBQUMvRSxnQkFBZ0I7QUFDaEIsTUFBTTtBQUVOLHlEQUF5RDtBQUN6RCxLQUFLO0FBRUwsMkNBQTJDO0FBQzNDLHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFDeEQsMkJBQTJCO0FBQzNCLGdCQUFnQjtBQUNoQixNQUFNO0FBRU4seURBQXlEO0FBQ3pELEtBQUs7QUFFTCwrQ0FBK0M7QUFDL0MsMERBQTBEO0FBQzFELGFBQWE7QUFDYix3REFBd0Q7QUFDeEQsMEJBQTBCO0FBQzFCLGtEQUFrRDtBQUNsRCwrRUFBK0U7QUFDL0UsaUJBQWlCO0FBQ2pCLDhFQUE4RTtBQUM5RSxNQUFNO0FBRU4seURBQXlEO0FBQ3pELEtBQUs7QUFFTCxnREFBZ0Q7QUFDaEQsMkRBQTJEO0FBQzNELHdEQUF3RDtBQUN4RCwyQkFBMkI7QUFDM0IsaUJBQWlCO0FBQ2pCLDBFQUEwRTtBQUMxRSxNQUFNO0FBRU4seURBQXlEO0FBQ3pELEtBQUs7QUFFTCw2Q0FBNkM7QUFDN0MsZ0VBQWdFO0FBQ2hFLG9FQUFvRTtBQUNwRSwyRUFBMkU7QUFFM0Usb0RBQW9EO0FBQ3BELGlEQUFpRDtBQUVqRCx1RUFBdUU7QUFDdkUsTUFBTTtBQUVOLDhDQUE4QztBQUM5QyxnRUFBZ0U7QUFDaEUsb0VBQW9FO0FBQ3BFLDRFQUE0RTtBQUU1RSxvREFBb0Q7QUFDcEQsaURBQWlEO0FBRWpELHVFQUF1RTtBQUN2RSxNQUFNO0FBRU4sb0NBQW9DO0FBQ3BDLHFDQUFxQztBQUNyQyx5REFBeUQ7QUFDekQseURBQXlEO0FBQ3pELCtCQUErQjtBQUMvQixvQkFBb0I7QUFDcEIsUUFBUTtBQUVSLHNFQUFzRTtBQUN0RSxrQ0FBa0M7QUFDbEMsS0FBSyJ9