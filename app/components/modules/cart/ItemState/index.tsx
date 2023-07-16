import React from 'react'
import { Item } from '../../../../types'
import { useRouter } from 'next/router'
import { useTypesSelector } from '../../../../hooks/useTypedSelector'

export interface Props {
  item: Item;
  AddToCart(item: Item): void;
}

export default function ItemState({ item, AddToCart }: Props) {
  const [ status, setStatus ] = React.useState<boolean>(true)
  const { cartItems } = useTypesSelector(state => state.user)

  const itemStatus = status ? 'Добавить в корзину' : 'Перейти в корзину'
  const router = useRouter()

  React.useEffect(() => {
    if (cartItems.map(cartItem => (item.id === cartItem.id) ? setStatus(false) : null)) {
    }
  }, [ status, setStatus ])

  const controlStatus = React.useCallback(() => {
    if (status) {
      AddToCart(item)
      setStatus(false)
    } else {
      router.push('route/cart')
    }
  }, [ status, setStatus ])

  return (
    <div>
      <div onClick={controlStatus}>{itemStatus}</div>
    </div>
  )
}
