import React from 'react'
import Image from 'next/image'

import styles from './CartIcon.module.css'

export interface Props {
  label: string;
  amountOfItems: string;
}

export default function CartIcon({ label, amountOfItems }: Props) {
  return (
    <div className={styles.root}>
      <Image src='/img/cart3.png' className={styles.cartIcon} width={40} height={40} alt="" />
      {!!amountOfItems ? (
        <>
          <span className={styles.amountOfItems}>{amountOfItems}</span>
          <span className={styles.total}>{label}</span>
        </>
      ) : (
        <div>Корзина</div>
        )}
    </div>
  )
}