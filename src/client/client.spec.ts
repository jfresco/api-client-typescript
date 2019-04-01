import { Client } from '../client'
import { FiatCurrency } from '../constants/currency'
import { Period } from '../queries/account/getAccountPortfolio'

test('client do something', async () => {
    const client = new Client
    await client.init()

    await client.login('anthony1@nash.io', 'af0782580bb2ec65b72cb184cf729dd16dfd5669ae247c64aa8d6d01b6ed8a34')
    const orders = await client.getAccountPortfolio(FiatCurrency.EUR, Period.WEEK)
    console.log(orders)
    // // const transactions = await client.listAccountTransactions('1', 'eur', 1)
    // const movements = await client.listMovements(CryptoCurrency.AOA)
    // console.log(movements)
    // // console.log(transactions)
})
