import React, { ChangeEvent } from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from "../../../types"
import styles from './cart.module.css'

import Link from 'next/link'
import CartItem from "./CartItem"

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useTypesSelector(state => state.user.cartItems)
  const isLoaded = useTypesSelector(state => state.user.isLoaded)

  const [ selectedItems, setSelectedItems ] = React.useState<any[]>([])

  React.useEffect(() => {
    setSelectedItems(cartItems)
  }, [ isLoaded ])

  const isEverythingSelected = React.useMemo(() => {
    return selectedItems.length === cartItems.length
  }, [ selectedItems, cartItems ])

  const handleSelectAllChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems)
    }
  }, [setSelectedItems, cartItems])

  const deleteItems = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEMS', payload: selectedItems.map(item => item.id) })
    setSelectedItems([])
  }, [ selectedItems, setSelectedItems ])

  const totalCartName = React.useMemo(() => {
    const totalAmount: string = String(selectedItems.reduce((accumulator, item) => accumulator + item.quantity, 0))
    if (totalAmount.slice(-1) === '1' && totalAmount.slice(-2) !== '11') {
      return 'товар'
    } else if ((totalAmount.slice(-1) === '2' || totalAmount.slice(-1) === '3' || totalAmount.slice(-1) === '4' &&
      totalAmount.slice(-2) !== '12' && totalAmount.slice(-2) !== '13' && totalAmount.slice(-2) !== '14')) {
      return 'товара'
    } else {
      return 'товаров'
    }
  }, [ selectedItems ])

  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB'})

  if (!cartItems.length) {
    return (
      <div className={styles.root}>
        <div className={styles.emptyCart}>
          <div>Корзина пустая</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div>
        {cartItems.length > 1 && (
          <div className={styles.massSelection}>
            <div style={{display: 'flex'}}>
              <input type="checkbox"
                     checked={isEverythingSelected}
                     onChange={handleSelectAllChange}
              />
              <div>Выбрать все</div>
            </div>
            <div onClick={deleteItems}>Удалить выбранные</div>
          </div>
        )}
        <div className={styles.itemsBlock}>
          {cartItems?.map((item: Item) => (
            <CartItem item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} isOnlyItem={cartItems.length === 1}/>
          ))}
        </div>
      </div>
      <div className={styles.totalSumBlock}>
        {selectedItems.length >= 1 ? (
            <>
              <div>
                <div style={{fontSize: '24px'}}>Детали заказа</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                  <div>
                    <div style={{fontSize: '12px', color: '#8c8c8c'}}>Итого</div>
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
            <>
              <div>
                <div style={{fontSize: '24px'}}>Товары не выбраны</div>
                <div className={styles.continueButton}>Перейти к оформлению</div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}