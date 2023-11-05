import React, {ChangeEvent} from 'react'

import { Slider, Switch } from 'antd'
import Router from 'next/router'

import { Item } from '../../../types'
import styles from './price.module.css'

export interface Props {
  items: Item[]
}

export default function PriceComponent({ items }: Props) {
  const alex = items.reduce((accumulator, item) => {
    return item.price < accumulator ? accumulator = item.price : accumulator
  }, 100000)
  const [ leftInputValue, setLeftInputValue ] = React.useState("1500")
  const [ rightInputValue, setRightInputValue ] = React.useState("10000")

  React.useEffect(() => {
    console.log(leftInputValue)
  }, [ setLeftInputValue, leftInputValue ])

  // const handleBlurLeftValue = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   const inputRegExp = new RegExp(/\d/g)
  //
  //   setLeftInputValue(e.target.value)
  // }, [ setLeftInputValue, leftInputValue ])

  const handleChangeLeftInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setLeftInputValue(value)
  }, [ setLeftInputValue ])

  const handleClickCloseButton = React.useCallback(() => {
    setLeftInputValue("")
  }, [ setLeftInputValue ])

  const handleClickPushPriceParam = React.useCallback(() => {
    Router.push({
      pathname: '/',
      query: { price: `${leftInputValue}-${rightInputValue}` }
    })
  }, [])

  return (
    <div>
      <div style={{ display: 'flex'}}>
        <label className={styles.leftInputLabel}>от</label>
        <input value={leftInputValue} placeholder={`${alex}`} onChange={handleChangeLeftInput} className={styles.leftInput} />
        {!!leftInputValue && <span onClick={handleClickCloseButton} className={styles.close} />}
      </div>
      <div>
        {/*<input />*/}
      </div>
      <button onClick={handleClickPushPriceParam}>Применить</button>
    </div>
  )
}