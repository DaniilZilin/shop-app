export enum UserActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
}

export interface CartState {
  cartItems: any[]
  cartFullPrice: number
}

interface ADD_TO_CART {
  type: UserActionTypes.ADD_TO_CART
  action: any[]
}

export interface UserAction {
  type: string;
  payload?: any;
}