import React, { ChangeEvent } from 'react'
import classNames from 'classnames'

import styles from '../Header.module.css'
import { Item } from '../../../types'
import Image from 'next/image'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Menu, MenuProps } from 'antd'
import Link from 'next/link'

import { store } from '../../../store'

export default function HeaderCart() {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  const removeItem = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }

  const setCart = React.useCallback((cartItems: any[]) => {
    dispatch({ type: 'SET_CART', payload: cartItems })
  }, [])

  React.useEffect(() => {
    const prepareCartData = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue) {
        setCart(JSON.parse(e.newValue))
      }
    }
    window.addEventListener('storage', prepareCartData);
    return () => window.removeEventListener('storage', prepareCartData);
  }, [])

  React.useEffect(() => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      setCart(JSON.parse(cartData))
    }
  }, [])

  const total = React.useMemo(() => ([{
    key: '',
    label: `${cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)} ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}₽`,
  }]), [cartItems])

  const [ stateChanges, setStateChanges ] = React.useState<boolean>(false)

  // React.useEffect(() => {
  //   let currentValue: any = JSON.parse(localStorage.getItem('cart')) || []
  //   const storeChange = store.subscribe(() => {
  //     let previousValue = currentValue
  //     currentValue = store.getState().user.cartItems
  //     if (currentValue.length > previousValue.length) {
  //       console.log(true)
  //       // setStateChanges(true)
  //     } else {
  //       console.log(false)
  //     }
  //   })
  //   return () => storeChange()
  // }, [ ])


  return (
    // <div className={styles.root}>
    <div className={classNames(styles.root, {[styles.true]: stateChanges})}>
      <div className={styles.itemsModal}>
        <div className={styles.container}>
          {cartItems.map((item: Item) => (
            <div className={styles.itemContainer}>
              <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="50" height="50"
                     alt=""/>
              <div className={styles.itemName}>{item.name}</div>
              <Image onClick={() => removeItem(item)} src={`/img/garbage.png`} width="20" height="20" alt=""/>
            </div>
          ))}
        </div>
        <Link className={styles.goToCartButton} href='/cart'>В корзину</Link>
      </div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={total}>
      </Menu>
    </div>
  )
}