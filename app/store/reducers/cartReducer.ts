import { CartState, UserAction, UserActionTypes } from '../../types'

const initialState: CartState = {
  cartItems: [],
}

export const cartReducer = (state = initialState, action: UserAction): CartState => {
  switch (action.type) {
    case UserActionTypes.ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] }

    case UserActionTypes.SET_CART:
      return { ...state, cartItems: action.payload }

    case UserActionTypes.INCREASE_QUANTITY:
      return { ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item )}

    case UserActionTypes.DECREASE_QUANTITY:
      return { ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity = 1}: item )}

    case UserActionTypes.DELETE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload.id)}

    case UserActionTypes.DELETE_ITEMS:
      return { ...state, cartItems: state.cartItems.filter(item => !action.payload.includes(item))}

    default:
      return { ...state}
  }
}