import React from 'react'
import { Item } from '../../../../types'
import { useRouter } from 'next/router'
import {useTypesSelector} from "../../../../hooks/useTypedSelector";

export interface Props {
  item: Item;
  AddToCart(item: Item): void;
}

export default function ItemState({ item, AddToCart }: Props) {
  const [ status, setStatus ] = React.useState<boolean>(true)
  const { cartItems, cartFullPrice } = useTypesSelector(state => state.user)


  const itemStatus = status ? 'Добавить в корзину' : 'Перейти в корзину'
  const router = useRouter()

  console.log(cartItems)

  React.useEffect(() => {
    if (cartItems.includes(item)) {
      setStatus(false)
    }
  })

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
