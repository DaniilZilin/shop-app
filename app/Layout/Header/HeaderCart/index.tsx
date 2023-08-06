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
import MiniCart from "./MiniCart";

export interface Props {
  shouldDisplayMiniCart: boolean
  setShouldDisplayMiniCart(shouldDisplayMiniCart: boolean): void
}

export default function HeaderCart({ shouldDisplayMiniCart, setShouldDisplayMiniCart}: Props) {
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

  const handleMouseOver = React.useCallback(() => {
    setShouldDisplayMiniCart(true)
  }, [ shouldDisplayMiniCart ])

  const handleMouseOut = React.useCallback(() => {
    setShouldDisplayMiniCart(false)
  }, [ shouldDisplayMiniCart ])

  return (
    <div className={styles.root} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {shouldDisplayMiniCart && <MiniCart cartItems={cartItems} />}
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={total}>
      </Menu>
    </div>
  )
}