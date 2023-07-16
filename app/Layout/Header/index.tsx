import React from 'react'

import { Layout, Menu, MenuProps } from 'antd'
import {useTypesSelector} from "../../hooks/useTypedSelector";
const { Header } = Layout



export default function HeaderLayout() {
  const { cartItems } = useTypesSelector(state => state.user)

  const items1: MenuProps['items'] = ['1'].map((key) => ({
    key,
    label: `${cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)} ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}₽`,
  }));

  return (
    <div>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}>
        </Menu>
      </Header>
    </div>
  )
}