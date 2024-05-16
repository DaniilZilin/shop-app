import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import {itemsApi} from "./reducers/itemsApi";

export const store = configureStore({
  devTools: false,
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
  // here we restore the previously persisted state
  preloadedState: {},
})