import React from 'react'
import { Item } from '../../../../types'
import { useTypesSelector } from '../../../../hooks/useTypedSelector'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export interface Props {
  item: Item;
}

export default function AddToCartButton({ item }: Props) {
  const dispatch = useDispatch()
  const { cartItems } = useTypesSelector(state => state.user)

  const handleAddToCartClick = React.useCallback(() => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }, [ item ])

  const isInCart = React.useMemo(() => cartItems.find(cartItem => item.id === cartItem.id), [item, cartItems])

  if (isInCart) {
    return <Link href='/cart'>Перейти в корзину</Link>
  } else {
    return <div onClick={handleAddToCartClick}>Добавить в корзину</div>
  }
}
