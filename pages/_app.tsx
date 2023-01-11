import { AppReact } from '../app/AppContextReact'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppReact>
      <Component {...pageProps} />
    </AppReact>
  )
}
