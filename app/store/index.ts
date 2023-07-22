import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  devTools: false,
  reducer: rootReducer,
  // here we restore the previously persisted state
  preloadedState: {},
})