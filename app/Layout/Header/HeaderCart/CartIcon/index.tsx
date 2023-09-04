import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './CartIcon.module.css'

export interface Props {
  label: string;
  amountOfItems: string;
}

let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

export default function CartIcon({label, amountOfItems}: Props) {
  return (
    <Link href="/cart">
      <div className={styles.root}>
        <Image src='/img/cart3.png' className={styles.cartIcon} width={40} height={40} alt=""/>
        {!!amountOfItems ? (
          <>
            <span className={styles.amountOfItems}>{amountOfItems}</span>
            <span className={styles.total}>{ruble.format(Number(label))}</span>
          </>
        ) : (
          <div>Корзина</div>
        )}
      </div>
    </Link>
  )
}