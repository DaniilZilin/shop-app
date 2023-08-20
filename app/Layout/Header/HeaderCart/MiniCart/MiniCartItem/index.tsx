import React from 'react'

import Image from 'next/image'

import { Item } from '../../../../../types'
import { useDispatch } from 'react-redux'
import styles from './MiniCartItem.module.css'


export interface Props {
  item: Item
}

export default function MiniCartItem({ item }: Props) {
  const dispatch = useDispatch()

  const removeItem = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }, [ item ])

  return (
    <div className={styles.root}>
      <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="50" height="50"
             alt=""/>
      <div className={styles.fullNameBlock}>
        <div className={styles.cartItemAmount}>x{item.quantity}</div>
        <div className={styles.cartItemName}>{item.name}</div>
        <Image onClick={removeItem} src={`/img/garbage.png`} width="20" height="20" alt=""/>
      </div>
    </div>
  )
}
