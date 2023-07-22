import React from 'react'

import { Layout } from 'antd'
const { Header } = Layout

import styles from './Header.module.css'
import classNames from 'classnames'
import HeaderCart from "./HeaderCart"

export default function HeaderLayout() {
  return (
    <div>
      <Header className={classNames(styles.headerList, 'header')}>
        <div className="demo-logo" />
        <HeaderCart />
      </Header>
    </div>
  )
}