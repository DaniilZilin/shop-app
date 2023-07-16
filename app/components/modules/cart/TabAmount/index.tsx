import React from 'react'
import { useRouter } from 'next/router'

import styles from '../cart.module.css'
import { useTypesSelector } from '../../../../hooks/useTypedSelector'


export default function TabAmount() {
  const { cartItems } = useTypesSelector(state => state.user)
  const router = useRouter()

  return (
    <div className={styles.totalSumContainer}>
      <div>Итого</div>
      <div>Сумма: {cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}</div>
      <div>Кол-во предметов: {cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}</div>
      <div onClick={() => router.push('/route/order/')}>Продолжить</div>
    </div>
  )
}