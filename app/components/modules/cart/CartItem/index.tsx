import React from 'react'
import styles from '../cart.module.css'
import CheckBoxItem from '../CheckBoxItem'
import Image from 'next/image'

import { Item } from '../../../../types'
import { useDispatch } from 'react-redux'

export interface Props {
  item: Item;
  selectedItems: any[];
  setSelectedItems(items: any[]): void;
  isOnlyItem: boolean;
}

export default function CartItem({ item, selectedItems, setSelectedItems, isOnlyItem }: Props) {
  const dispatch = useDispatch()

  const increaseQuantityHandleClick = React.useCallback(() => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item })
    setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: item.quantity + 1} : item1))
    console.log(selectedItems)
  }, [ item, setSelectedItems, selectedItems ])

  const decreaseQuantityHandleClick = React.useCallback(() => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
    setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: item.quantity != 1 ? item.quantity - 1 : item.quantity} : item1))
  }, [ item, setSelectedItems, selectedItems ])

  const deleteItem = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
    setSelectedItems(selectedItems?.filter(item1 => item1.id !== item.id))
    console.log(selectedItems)
  }, [ item, selectedItems, setSelectedItems ])

  const handleChange = React.useCallback((checked: boolean, item: Item) => {
    if (!checked) {
      setSelectedItems(selectedItems.filter(item1 => item1.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }, [ setSelectedItems, selectedItems, item ])

  return (
    <div className={styles.itemBlock}>
      {!isOnlyItem && (
        <CheckBoxItem
          item={item}
          checked={!!selectedItems.find(item1 => item1.id === item.id)}
          onChange={handleChange}
        />
      )}
      <div className={styles.cartImage}>
        <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150" alt=""/>
      </div>
      <div className={styles.cartItemBlock}>
        <div className={styles.itemName}>{item.name}</div>
        <div onClick={deleteItem}>Удалить</div>
      </div>
      <div className={styles.itemQuantityBlock}>
        <div className={styles.quantityCounter}>
          <div className={styles.plusCounter} onClick={increaseQuantityHandleClick}>+</div>
          <div className={styles.quantityCounter2}>{item.quantity}</div>
          <div className={styles.minusCounter} onClick={decreaseQuantityHandleClick}>-</div>
        </div>
        <div>
          {item.quantity > 1 && (<div>{item.price + `₽`} / шт.</div>)}
        </div>
      </div>
      <div className={styles.priceBlock}>
        <div style={{fontSize: '20px'}}>{item.price * item.quantity}₽</div>
      </div>
    </div>
  )
}