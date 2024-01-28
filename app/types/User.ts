export enum UserActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  SET_CART = 'SET_CART',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ITEMS = 'DELETE_ITEMS',
  CHANGE_QUANTITY = 'CHANGE_QUANTITY'
}

export interface CartState {
  cartItems: any[]
  isLoaded: boolean
}

export interface UserAction {
  type: string;
  payload?: any;
}