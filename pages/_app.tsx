import { AppReact } from '../app/AppContextReact'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// const defaultState = {
//     cash: 0
// }
//
// const reducer = (state = defaultState, action: any) => {
//     switch(action.type) {
//         case "ADD_CASH":
//             return {...state, cash: state.cash + action.payload}
//         case "GET_CASH":
//             return {...state, cash: state.cash - action.payload}
//         default:
//             return state
//     }
// }
//
// const store = createStore(reducer)


export default function App({ Component, pageProps }: AppProps) {
  return (
      <AppReact>
        <Component {...pageProps} />
      </AppReact>
  )
}
