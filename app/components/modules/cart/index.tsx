import React from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import {Item} from "../../../types"
import styles from './cart.module.css'
import Image from "next/image";


export default function Cart() {
  const { cartItems, cartFullPrice } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('cartItems'))})
  }, [])

  const INCREASE_QUANTITY = () => {
    dispatch({ type: 'INCREASE_QUANTITY'})
  }

  const DECREASE_QUANTITY = () => {
    dispatch({ type: 'INCREASE_QUANTITY'})
  }
  console.log(cartItems)

  return (
  <div className={styles.root}>
    <div>
   {cartItems?.map((item: Item) => (
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
       </div>
     </div>
   ))}
    </div>
    <div className={styles.totalSumContainer}>
      <div>Детали заказа</div>

    </div>
  </div>
)}


