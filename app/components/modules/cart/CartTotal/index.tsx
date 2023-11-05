import React from 'react'
import Link from 'next/link'

import styles from './CartTotal.module.css'

export interface Props {
  selectedItems: any[]
}

export default function CartTotal({ selectedItems }: Props) {
  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

  const totalCartName = React.useMemo(() => {
    const totalAmount: string = String(selectedItems.reduce((accumulator, item) => accumulator + item.quantity, 0))
    if (totalAmount.slice(-1) === '1' && totalAmount.slice(-2) !== '11') {
      return 'товар'
    } else if (((totalAmount.slice(-1) === '2' || totalAmount.slice(-1) === '3' || totalAmount.slice(-1) === '4') &&
        (totalAmount.slice(-2) !== '12' && totalAmount.slice(-2) !== '13' && totalAmount.slice(-2) !== '14'))) {
      return 'товара'
    } else {
      return 'товаров'
    }
  }, [ selectedItems ])

  return (
    <div>
      {selectedItems.length >= 1 ? (
          <>
            <div>
              <div style={{fontSize: '24px'}}>Детали заказа</div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <div>
                  <div className={styles.total}>Итого</div>
                  <div>{selectedItems.reduce((accumulator, item) => accumulator + item.quantity, 0)} {totalCartName}</div>
                </div>
                <div>{ruble.format(selectedItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0))}</div>
              </div>
            </div>
            <Link className={styles.continueButton} href='/order'>Перейти к оформлению</Link>
          </>
        )
        :
        (
          <div>
            <div style={{fontSize: '24px'}}>Товары не выбраны</div>
            <div className={styles.continueButton}>Перейти к оформлению</div>
          </div>
        )}
    </div>
  )
}