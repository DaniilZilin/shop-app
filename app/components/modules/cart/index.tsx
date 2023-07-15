import React from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from "../../../types"
import styles from './cart.module.css'
import Image from 'next/image'


export default function Cart() {
  const { cartItems, cartFullPrice } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('cartItems'))})
  // }, [])

  const INCREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item})
    console.log(cartItems)
  }

  const DECREASE_QUANTITY = (item: Item) => {
    dispatch({type: 'DECREASE_QUANTITY', payload: item})
  }

  const DELETE_ITEM = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item})
  }
  console.log(cartItems)

  return (
  <div className={styles.root}>
    <div>
   {cartItems?.map((item: Item, key) => (
     <div className={styles.itemsContainer}>
       <div>
         <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150" alt="" />
       </div>
       <div>
         <div>
           <div>{item.name}</div>
           <div>{item.brand}</div>
         </div>
       </div>
       <div>
         <div>{item.price + `₽`}</div>
         <div>{item.quantity}</div>
         <div onClick={() => DELETE_ITEM(item)}>Delete item</div>
         <div onClick={() => INCREASE_QUANTITY(item)}>Increase quantity</div>
         <div onClick={() => DECREASE_QUANTITY(item)}>Decrease quantity</div>
       </div>
     </div>
   ))}
    </div>
    <div className={styles.totalSumContainer}>
      <div>Детали заказа</div>
    </div>
  </div>
)}


