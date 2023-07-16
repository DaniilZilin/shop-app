import React from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from "../../../types"
import styles from './cart.module.css'
import Image from 'next/image'

import TabAmount from './TabAmount'

export default function Cart() {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('cartItems'))})
  // }, [])

  const INCREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item})
    console.log(cartItems)
  }

  const DECREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
  }

  const DELETE_ITEM = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item})
  }
  console.log(cartItems)

  return (
    <div className={styles.root}>
      <div>
      {cartItems.length > 1 ? (
      <div style={{ border: '2px solid red'}}>
        <input type="checkbox" />
        <p>Выбрать все</p>
        <p>Удалить выбранные</p>
      </div>
      ) : null}
      {cartItems.map((item: Item) => (
        <div className={styles.itemsContainer}>
          {cartItems.length > 1 ? <input type='checkbox' checked />: null}
                  <div>
                    <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150" alt=""/>
                  </div>
                  <div>
                    <div>{item.name}</div>
                    <div>{item.brand}</div>
                  </div>
                  <div>
                    <div>За 1 шт.{item.price + `₽`}</div>
                    <div>Cумма{item.price * item.quantity}</div>
                    <div onClick={() => DELETE_ITEM(item)}>Удалить</div>
                    <br/>
                    <div className={styles.quantityCounter}>
                      <div className={styles.leftCounter} onClick={() => INCREASE_QUANTITY(item)}>+</div>
                      <div>{item.quantity}</div>
                      <div className={styles.rightCounter} onClick={() => DECREASE_QUANTITY(item)}>-</div>
                    </div>
                  </div>
        </div>
      ))}
      </div>
      <TabAmount/>
    </div>
  )
}


