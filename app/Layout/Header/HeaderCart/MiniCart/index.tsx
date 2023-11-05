import React from 'react'

import styles from './MiniCart.module.css'
import { Item } from '../../../../types'
import Link from 'next/link'
import MiniCartItem from './MiniCartItem'
import { useDispatch } from 'react-redux'

export interface Props {
  cartItems: any[];
}

export default function MiniCart({ cartItems }: Props) {
  const dispatch = useDispatch()
  const deleteItems = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEMS', payload: cartItems.map(item => item.id) })
  }, [ cartItems ])

  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
  if (cartItems.length === 0) return null

  return (
    <div className={styles.root}>
      <div className={styles.topHeader}>
        <div>Основные предметы:</div>
        <div className={styles.clearListButton} onClick={deleteItems}>Очистить список</div>
      </div>
      <div className={styles.cartItemsContainer}>
        {cartItems?.map((item: Item, i) => (
          <MiniCartItem key={i} item={item} />
        ))}
      </div>
      <div className={styles.bottomContainer}>
        <div>
          <div className={styles.total}>Итого:</div>
          <div className={styles.totalSum}>{`${ruble.format(cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0))}`}</div>
        </div>
        <Link className={styles.goToCartButton} href='/cart'>В корзину</Link>
      </div>
    </div>
  )
}