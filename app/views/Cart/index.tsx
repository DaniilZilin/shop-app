import React from 'react'
import {useTypesSelector} from "../../hooks/useTypedSelector";


export interface Props {

}

export default function CartView() {
  const { cartItems, cartFullPrice } = useTypesSelector(state => state.user)
  console.log(cartItems)
  return (
    <div>
      {!cartItems ? cartItems  : 'Корзина пуста'}
    </div>
  )
}