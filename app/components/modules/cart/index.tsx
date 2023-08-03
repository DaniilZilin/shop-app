import React, { ChangeEvent } from 'react'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Item } from "../../../types"
import styles from './cart.module.css'
import Image from 'next/image'

import CheckBoxItem from './CheckBoxItem'
import Link from 'next/link'

export default function Cart() {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  const DELETE_ITEM = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }

  const [ isCheck, setIsCheck ] = React.useState<any[]>([])

  const onQuantity = React.useCallback((item: Item) => {
    if (isCheck.find(item1 => item1.id === item.id) === undefined) {
      setIsCheck([...isCheck, item])
    }
  }, [ setIsCheck, isCheck ])

  const INCREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item })
  }

  const DECREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
  }

  React.useEffect(() => {
    setIsCheck(cartItems)
  }, [])

  // React.useEffect(() => {
  //   setIsCheck(cartItems)
  // }, [ setIsCheck, cartItems ])

  const selectAllHandleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setIsCheck([])
    } else {
      setIsCheck(cartItems)
    }
  }, [ setIsCheck, cartItems ])

  const handleChange = React.useCallback((checked: boolean, item: Item) => {
    if (!checked) {
      setIsCheck(isCheck.filter(item1 => item1.id !== item.id))
    } else {
      setIsCheck([...isCheck, item])
    }
  }, [ setIsCheck, isCheck ])

  const isTheSame = React.useMemo(() => {
    return isCheck.length === cartItems.length
  }, [ isCheck ])

  const totalCartName = React.useMemo(() => {
    const totalAmount = isCheck.reduce((accumulator, item) => accumulator + item.quantity, 0)
    if (totalAmount === 1 || totalAmount === 21 || totalAmount === 41) {
      return 'товар'
    } else if (totalAmount >= 2 && totalAmount <= 4) {
      return 'товара'
    } else {
      return 'товаров'
    }
  }, [ isCheck ])

  const DELETE_ITEMS = React.useCallback((isCheck: any[]) => {
    dispatch({ type: 'DELETE_ITEMS', payload: isCheck })
    setIsCheck(isCheck)
  }, [ isCheck, setIsCheck ])

  return (
    <div className={styles.root}>
      {cartItems.length >= 1 ? (
      <>
        <div>
            {cartItems.length > 1 && (
              <div className={styles.massSelection}>
                <div style={{ display: 'flex'}}>
                  <input type="checkbox"
                    checked={isTheSame}
                    onChange={selectAllHandleChange}
                  />
                  <div>Выбрать все</div>
                </div>
                <div onClick={() => DELETE_ITEMS(isCheck)}>Удалить выбранные</div>
              </div>
            )}
            <div className={styles.itemsBlock}>
            {cartItems?.map((item: Item) => (
                <div className={styles.itemBlock}>
                  {cartItems.length > 1 && (
                    <CheckBoxItem
                      item={item}
                      checked={isCheck.find(item1 => item1.id == item.id)}
                      onChange={handleChange}
                    />
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
        <div className={styles.totalSumBlock}>
          {isCheck.length >= 1 ? (
            <>
              <div>
                <div style={{fontSize: '24px'}}>Детали заказа</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                  <div>
                    <div style={{fontSize: '12px', color: '#8c8c8c'}}>Итого</div>
                    <div>{isCheck.reduce((accumulator, item) => accumulator + item.quantity, 0)} {totalCartName}</div>
                  </div>
                  <div>{isCheck.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}₽</div>
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


