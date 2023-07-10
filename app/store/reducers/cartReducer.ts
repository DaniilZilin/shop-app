import { CartState, UserAction, UserActionTypes } from '../../types'

const initialState: CartState = {
  cartItems: [],
  cartFullPrice: 0
}

export const cartReducer = (state = initialState, action: UserAction): CartState => {
  switch (action.type) {
    case UserActionTypes.ADD_TO_CART:
      return { cartFullPrice: state.cartFullPrice + action.payload.price, cartItems: state.cartItems.concat(action.payload) }
    case UserActionTypes.SET_CART:
      return {...state, cartItems: state.cartItems.concat(action.payload)}
    case UserActionTypes.INCREASE_QUANTITY:
      return {...state}
    case UserActionTypes.DECREASE_QUANTITY:
      return {...state}
    default:
      return {...state}
  }
}