import React from 'react'

import { Layout, Menu, MenuProps } from 'antd'
import {useTypesSelector} from "../../hooks/useTypedSelector";
const { Header } = Layout

import { Item } from '../../types'
import Image from 'next/image'
import styles from './Header.module.css'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

export default function HeaderLayout() {
  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  const router = useRouter()

  const items1: MenuProps['items'] = [''].map((key) => ({
    key,
    label: `${cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)} ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}₽`,
  }))

  const removeItem = (item: Item) => {
    dispatch({ type: 'DELETE_ITEM', payload: item })
  }

  return (
    <div>
      <Header className={classNames(styles.headerList, 'header')}>
        <div className="demo-logo" />
          {/*<div className={styles.itemsModal}>*/}
          <div className={classNames(styles.itemsModal, {[styles.add]: cartItems.length >= 1})}>
            <div className={styles.container}>
            {cartItems.map((item: Item) => (
              <div className={styles.itemContainer}>
                <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="50" height="50" alt="" />
                <div className={styles.itemName}>{item.name}</div>
                <Image onClick={() => removeItem(item)} src={`/img/garbage.png`} width="20" height="20" alt="" />
              </div>
            ))}
            </div>
            <div className={styles.goToCartButton} onClick={() => router.push('/route/cart/')}>В корзину</div>
          </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1}>
        </Menu>
      </Header>
    </div>
  )
}