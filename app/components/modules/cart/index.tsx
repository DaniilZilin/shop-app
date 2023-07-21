import React, { ChangeEvent } from 'react'
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

  // const [ isCheckAll, setIsCheckAll ] = React.useState(true)
  const [ isCheck, setIsCheck ] = React.useState<any[]>(cartItems)

  const INCREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item })
    if (isCheck.find(cartitem => cartitem.id === item.id)) {
      // change quantity param
    } else {
      setIsCheck([...isCheck, item])
    }
  }

  const DECREASE_QUANTITY = (item: Item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item })
    setIsCheck(([...isCheck]))
  }

  const DELETE_ITEM = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }

  const DELETE_ITEMS = (isCheck: any[]) => {
    dispatch({ type: 'DELETE_ITEMS', payload: isCheck })
  }

  React.useEffect(() => {
    console.log(isCheck)
    console.log(isCheckAll)
  })

  const defaultChecked = React.useCallback((item: Item) => {
    const found = (isCheck.find((item1) => item1.id === item.id))
    return found !== false;
  }, [ isCheck, setIsCheck ])

  const addChecked = (item: Item) => {
    setIsCheck([...isCheck, item]);
  }

  const removeChecked = (item: Item) => {
    const toBeRemove = isCheck.find(cartitem => cartitem.id === item.id)

    if (toBeRemove) {
      isCheck.splice(isCheck.indexOf(toBeRemove), 1)
      setIsCheck([...isCheck]);
    }
  };

  const handleChange = React.useCallback((checked: boolean, item: Item) => {
    if (checked) {
      addChecked(item)
    } else {
      removeChecked(item)
    }
  }, [ setIsCheck, isCheck ])

  const handleCheckbox = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (isCheckAll) {
      setIsCheck([]);
    } else setIsCheck([...cartItems])
  }, [])

  const isCheckAll = isCheck.length === cartItems.length

  return (
    <div className={styles.root}>
      {cartItems.length >= 1 ? (
      <>
        <div>
            {cartItems.length > 1 && (
              <div className={styles.massSelection}>
                <div style={{ display: 'flex'}}>
                  <input type="checkbox"
                    onChange={handleCheckbox}
                    checked={isCheckAll}
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
                      onChange={handleChange}
                      item={item}
                      checked={defaultChecked(item)}
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
        <TabAmount isCheck={isCheck} />
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


