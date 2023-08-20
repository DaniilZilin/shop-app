import React from 'react'

import styles from './MiniCart.module.css'
import { Item } from '../../../../types'
import Link from 'next/link'
import MiniCartItem from './MiniCartItem'

export interface Props {
  cartItems: any[];
}

export default function MiniCart({ cartItems }: Props) {
  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>Основные предметы: </div>
        <div>Очистить список</div>
      </div>
      <div className={styles.cartItemsContainer}>
        {cartItems?.map((item: Item) => (
          <MiniCartItem item={item} />
        ))}
      </div>
      <Link className={styles.goToCartButton} href='/order'>В корзину</Link>
    </div>
  )
}