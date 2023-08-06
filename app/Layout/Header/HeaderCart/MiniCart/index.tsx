import React from 'react'

import styles from '../../Header.module.css'
import {Item} from '../../../../types'
import Image from 'next/image'
import {useDispatch} from "react-redux";
import Link from "next/link";

export interface Props {
  cartItems: any[];
}

export default function MiniCart({cartItems}: Props) {
  const dispatch = useDispatch()

  const removeItem = (item: Item) => {
    dispatch({type: 'DELETE_ITEM', payload: item})
  }

  return (
    <div className={styles.itemsModal}>
      <div className={styles.container}>
        {cartItems.map((item: Item) => (
          <div className={styles.itemContainer}>
            <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="50" height="50"
                   alt=""/>
            <div className={styles.itemName}>{item.name}</div>
            <Image onClick={() => removeItem(item)} src={`/img/garbage.png`} width="20" height="20" alt=""/>
          </div>
        ))}
      </div>
      <Link className={styles.goToCartButton} href='/cart'>В корзину</Link>

    </div>
  )
}