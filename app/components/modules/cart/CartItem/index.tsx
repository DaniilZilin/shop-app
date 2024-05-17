import React, { ChangeEvent } from 'react'
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
  const [ itemQuantity, setItemQuantity ] = React.useState<number>(item.quantity)

  React.useEffect(() => {
    console.log(itemQuantity)
  })

  const increaseQuantityHandleClick = React.useCallback(() => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item })
    setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: item.quantity + 1} : item1))
    setItemQuantity(itemQuantity + 1)
  }, [ item, setSelectedItems, selectedItems, itemQuantity, setItemQuantity ])

  const decreaseQuantityHandleClick = React.useCallback(() => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
    setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: item.quantity != 1 ? item.quantity - 1 : item.quantity} : item1))
    setItemQuantity(item.quantity != 1 ? item.quantity - 1 : item.quantity)
  }, [ item, setSelectedItems, selectedItems, setItemQuantity, itemQuantity ])

  const deleteItem = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
    setSelectedItems(selectedItems?.filter(item1 => item1.id !== item.id))
  }, [ item, selectedItems, setSelectedItems ])

  const handleChange = React.useCallback((checked: boolean, item: Item) => {
    if (!checked) {
      setSelectedItems(selectedItems.filter(item1 => item1.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }, [ setSelectedItems, selectedItems, item ])

  const handleChangeCount = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value))
  }, [ setItemQuantity ])

  const handleBlur = React.useCallback(() => {
    if (itemQuantity <= 1) {
      dispatch({ type: 'CHANGE_QUANTITY', payload: {...item, quantity: 1} })
      setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: 1 } : item1))
      setItemQuantity(1)
    } else {
      dispatch({ type: 'CHANGE_QUANTITY', payload: {...item, quantity: itemQuantity} })
      setSelectedItems(selectedItems.map(item1 => item1.id === item.id ? {...item, quantity: itemQuantity } : item1))
      setItemQuantity(itemQuantity)
    }
  }, [ item, setSelectedItems, selectedItems, setItemQuantity, itemQuantity ])

  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

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
        <Image className={styles.itemPhoto} src={`/img/items_images/${item.photos[0].photo}`} width="150" height="150" alt=""/>
      </div>
      <div className={styles.cartItemBlock}>
        <div className={styles.itemName}>{item.name}</div>
        <div onClick={deleteItem}>Удалить</div>
      </div>
      <div className={styles.itemQuantityBlock}>
        <div className={styles.quantityCounter}>
          <div className={styles.plusCounter} onClick={increaseQuantityHandleClick}>+</div>
          <input onBlur={handleBlur} onChange={handleChangeCount} value={itemQuantity} style={{ width: 30 }} />
          <div>{item.quantity}</div>
          <div className={styles.minusCounter} onClick={decreaseQuantityHandleClick}>-</div>
        </div>
        <div>
          {item.quantity > 1 && (<div>{ruble.format(item.price)} / шт.</div>)}
        </div>
      </div>
      <div className={styles.priceBlock}>
        <div style={{fontSize: '20px'}}>{ruble.format(item.price * item.quantity)}</div>
      </div>
    </div>
  )
}