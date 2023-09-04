import React from 'react'

import styles from '../Header.module.css'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Menu, MenuProps } from 'antd'

import { store } from '../../../store'
import MiniCart from "./MiniCart";
import CartIcon from './CartIcon'

export interface Props {
  shouldDisplayMiniCart: boolean
  setShouldDisplayMiniCart(shouldDisplayMiniCart: boolean): void
}

export default function HeaderCart({ shouldDisplayMiniCart, setShouldDisplayMiniCart}: Props) {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

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

  const total = React.useMemo(() => ([
    {
      key: '',
      // icon: React.createElement(CartIcon, {
      //   amountOfItems: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
      //   label: `${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)} ₽`
      // }),
      icon: <CartIcon
        amountOfItems={cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}
        label={`${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}`}
      />
    }]), [cartItems])

  const handleMouseOver = React.useCallback(() => {
    setShouldDisplayMiniCart(true)
  }, [ shouldDisplayMiniCart ])

  const handleMouseOut = React.useCallback(() => {
    setShouldDisplayMiniCart(false)
  }, [ shouldDisplayMiniCart ])

  return (
    <div className={styles.root} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {shouldDisplayMiniCart && <MiniCart cartItems={cartItems} />}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']} items={total} className={styles.headerIcon}>
      </Menu>
    </div>
  )
}