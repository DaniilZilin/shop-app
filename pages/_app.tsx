import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Script from 'next/script'

import { store } from '../app/store'

const YANDEX_MAP_KEY = '<1dca8b5e-1131-414f-b759-3205e3731b70W>'

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    let currentValue: any
    const unsubscribe = store.subscribe(() => {
      let previousValue = currentValue
      currentValue = store.getState().user.cartItems
      if (previousValue !== currentValue) {
        if (currentValue) {
          localStorage.setItem('cart', JSON.stringify(currentValue))
        } else {
          localStorage.setItem('cart', '[]')
        }
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <Provider store={store}>
      <Script src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_MAP_KEY}`} />
      <Component {...pageProps} />
    </Provider>
  )
}
