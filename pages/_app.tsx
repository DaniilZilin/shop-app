import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Script from 'next/script'

import { store } from '../app/store'

const YANDEX_MAP_KEY = '<1dca8b5e-1131-414f-b759-3205e3731b70W>'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Script src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_MAP_KEY}`} />
      <Component {...pageProps} />
    </Provider>
  )
}
