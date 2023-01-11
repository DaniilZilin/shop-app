import React from 'react'
import { Item } from '../../types'

import styles from './ItemsList.module.css'

export interface Props {
  items: Item[]
}

export default function ItemsList({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
          <>
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>{item.price + `₽`}</div>
            <div>{item.order_available}</div>
            <div>{item.rating}</div>
            <div>{item.specs}</div>
          </>
      ))}
    </div>
  )
}

