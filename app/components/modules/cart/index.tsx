import React from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from "../../../types"
import styles from './cart.module.css'
import Image from 'next/image'

import TabAmount from './TabAmount'
import CheckBoxItem from './CheckBoxItem'

export default function Cart() {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('cartItems'))})
  // }, [])

  const INCREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item })
    console.log(cartItems)
  }

  const DECREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
  }

  const DELETE_ITEM = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }

  return (
    <div className={styles.root}>
      {cartItems.length >= 1 ? (
      <>
        <div>
            {cartItems.length > 1 && (
              <div className={styles.massSelection}>
                <div style={{ display: 'flex'}}>
                  <input type="checkbox"/>
                  <div>Выбрать все</div>
                </div>
                <div>Удалить выбранные</div>
              </div>
            )}
            <div className={styles.itemsBlock}>
            {cartItems?.map((item: Item) => (
                <div className={styles.itemBlock}>
                  {cartItems.length > 1 && (
                    <CheckBoxItem />
                  )}
                  <div className={styles.cartImage}>
                    <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150" alt=""/>
                  </div>
                  <div className={styles.cartItemBlock}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div onClick={() => DELETE_ITEM(item)}>Удалить</div>
                  </div>
                  <div className={styles.itemQuantityBlock}>
                    <div className={styles.quantityCounter}>
                      <div className={styles.plusCounter} onClick={() => INCREASE_QUANTITY(item)}>+</div>
                      <div className={styles.quantityCounter2}>{item.quantity}</div>
                      <div className={styles.minusCounter} onClick={() => DECREASE_QUANTITY(item)}>-</div>
                    </div>
                    <div>
                      {item.quantity > 1 && (<div>{item.price + `₽`} / шт.</div>)}
                    </div>
                  </div>
                  <div className={styles.priceBlock}>
                    <div style={{ fontSize: '20px'}}>{item.price * item.quantity}₽</div>
                  </div>
                </div>
            ))}
            </div>
        </div>
        <TabAmount />
      </>
        )
        :
        (
          <div className={styles.emptyCart}>
            <div>Корзина пустая</div>
          </div>
        )
      }
    </div>
  )
}


