export enum UserActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  SET_CART = 'SET_CART',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  DELETE_ITEM = 'DELETE_ITEM',
}

export interface CartState {
  cartItems: any[]
}

interface ADD_TO_CART {
  type: UserActionTypes.ADD_TO_CART
  action: any[]
}

export interface UserAction {
  type: string;
  payload?: any;
}