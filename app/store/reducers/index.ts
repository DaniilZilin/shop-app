import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import {itemsApi} from "./itemsApi";

export const rootReducer = combineReducers({
  user: cartReducer,
  [itemsApi.reducerPath]: itemsApi.reducer,

})

export type RootState = ReturnType<typeof rootReducer>