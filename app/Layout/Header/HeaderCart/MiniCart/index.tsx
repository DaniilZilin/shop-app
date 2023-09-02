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
  console.log(cartItems)

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>Основные предметы: </div>
        <div onClick={deleteItems}>Очистить список</div>
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