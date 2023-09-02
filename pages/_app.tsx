import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Script from 'next/script'

import { store } from '../app/store'


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
      <Component {...pageProps} />
    </Provider>
  )
}
