import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '../app/store'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/*<Script src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_MAP_KEY}`} onLoad={handleMapLoad} />*/}
      <Component {...pageProps} />
    </Provider>
  )
}
