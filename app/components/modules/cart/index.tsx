import React, { ChangeEvent } from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from '../../../types'
import styles from './cart.module.css'

import CartItem from './CartItem'
import CartTotal from './CartTotal'

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
  }, [ setSelectedItems, cartItems ])

  const deleteItems = React.useCallback(() => {
    dispatch({ type: 'DELETE_ITEMS', payload: selectedItems.map(item => item.id) })
    setSelectedItems([])
  }, [ selectedItems, setSelectedItems ])

  React.useEffect(() => {
    if (!!selectedItems && cartItems.length === 1) {
      setSelectedItems(cartItems)
    }
  }, [ setSelectedItems, cartItems, selectedItems ])

  React.useEffect(() => {

  }, [])

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
          {cartItems?.map((item: Item, i) => (
            <CartItem key={i} item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} isOnlyItem={cartItems.length === 1} />
          ))}
        </div>
      </div>
      <div className={styles.totalSumBlock}>
        <CartTotal selectedItems={selectedItems} />
      </div>
    </div>
  )
}