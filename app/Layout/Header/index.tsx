import React from 'react'

import { Layout } from 'antd'
const { Header } = Layout

import styles from './Header.module.css'
import classNames from 'classnames'
import HeaderCart from "./HeaderCart"

export interface Props {
  shouldDisplayMiniCart: boolean
  setShouldDisplayMiniCart(shouldDisplayMiniCart: boolean): void
}

export default function HeaderLayout({ shouldDisplayMiniCart, setShouldDisplayMiniCart}: Props) {
  return (
    <div>
      <Header className={classNames(styles.headerList, 'header')}>
        <div className="demo-logo" />
        <HeaderCart shouldDisplayMiniCart={shouldDisplayMiniCart} setShouldDisplayMiniCart={setShouldDisplayMiniCart}/>
      </Header>
    </div>
  )
}