import React from 'react'
import { Item } from '../../../../types'
import {useRouter} from "next/router";

export interface Props {
  item: Item
  AddToCart(item: Item): void
}

export default function ItemState({ item, AddToCart }: Props) {
  const [ item2, setItem ] = React.useState<boolean>(true)

  const itemStatus = item2 ? 'Добавить в корзину' : 'Перейти в корзину'
  const router = useRouter()

  const controlStatus = React.useCallback(() => {
    if (item2) {
      AddToCart(item)
      setItem(false)
    } else {
      router.push('route/cart')
    }
  }, [ item2, setItem ])

  return (
    <div>
      <div onClick={controlStatus}>{itemStatus}</div>
    </div>
  )
}
