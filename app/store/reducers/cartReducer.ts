import { CartState, UserAction, UserActionTypes } from '../../types'

const initialState: CartState = {
  cartItems: [],
  cartFullPrice: 0
}

export const cartReducer = (state = initialState, action: UserAction): CartState => {
  switch (action.type) {
    case UserActionTypes.ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] }

    case UserActionTypes.SET_CART:
      return { ...state, cartItems: state.cartItems.concat(action.payload) }

    case UserActionTypes.INCREASE_QUANTITY:
      return { ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item )}

    case UserActionTypes.DECREASE_QUANTITY:
      const item1 = state.cartItems.find((item) => item.id === action.payload.id)
      if (item1.quantity === 1) {
        item1.quantity = 1
      } else {
        item1.quantity--
      }
      // return {...state, cartItems: [...state.cartItems, item1]}
      return {...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity - 1}: item )}

    case UserActionTypes.DELETE_ITEM:
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      return {...state, cartItems: state.cartItems = removeItem}

    default:
      return {...state}
  }
}