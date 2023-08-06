export enum UserActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  SET_CART = 'SET_CART',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ITEMS = 'DELETE_ITEMS'
}

export interface CartState {
  cartItems: any[]
  isLoaded: boolean
}

interface ADD_TO_CART {
  type: UserActionTypes.ADD_TO_CART
  action: any[]
}

export interface UserAction {
  type: string;
  payload?: any;
}