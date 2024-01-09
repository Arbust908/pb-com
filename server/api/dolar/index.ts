// https://dolarapi.com/v1/dolares
// https://bluelytics.com.ar/#!/api
const ExchangeCoins = {
  USD: 'USD',
} as const

type EXCHANGE_COIN_TYPES = typeof ExchangeCoins[keyof typeof ExchangeCoins]

interface Exchange {
  moneda: EXCHANGE_COIN_TYPES
  casa: string
  nombre: string
  compra: number
  venta: number
  fechaActualizacion: string
}

export default defineEventHandler(async () => {
  const responses = await $fetch<Exchange[]>('https://dolarapi.com/api/v1/dolares')

  return responses
})
/* https://dolarapi.com/v1/dolares/blue
/// v1/cotizaciones/uyu
*/
