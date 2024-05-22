import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/router'

import styles from './price.module.css'
import classNames from 'classnames'

export default function PriceComponent() {
  const [ leftInputValue, setLeftInputValue ] = React.useState<string | number>("")
  const [ rightInputValue, setRightInputValue ] = React.useState<string | number>("")

  const router = useRouter()
  const price: string | string[] = router.query.price ? router.query.price : '';
  var [start, end] = (price as string).split('-')

  React.useEffect(() => {
    setLeftInputValue(start)
    setRightInputValue(end)
  }, [ setLeftInputValue, setRightInputValue, start, end ])

  const handleChangeLeftInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value.replace(/\D/g, '')
    setLeftInputValue(e.target.value)
  }, [ setLeftInputValue ])

  const handleChangeRightInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value.replace(/\D/g, '')
    setRightInputValue(e.target.value)
  }, [ setRightInputValue ])

  const handleClickClearLeftInput = React.useCallback(() => {
    setLeftInputValue("")
  }, [ setLeftInputValue ])

  const handleClickClearRightInput = React.useCallback(() => {
    setRightInputValue("")
  }, [ setRightInputValue ])

  const handleClickPushPriceParam = () => (
    router.push({
      pathname: '/',
      query: { ...router.query, price: `${leftInputValue}-${rightInputValue}`},
    }, undefined, { shallow: true })
  )

  const setValue = React.useMemo(() => {
    return rightInputValue && leftInputValue
  }, [ rightInputValue, leftInputValue ])


  return (
    <div>
      <div style={{ display: 'flex'}}>
        <div>
          <label className={styles.inputLabel}>от</label>
          <input value={leftInputValue} placeholder={``}
                 onChange={handleChangeLeftInput}
                 className={styles.priceInput} />
          {!!leftInputValue && <div
              onClick={handleClickClearLeftInput}
              className={styles.close} />}
        </div>
        <div>
          <label className={styles.inputLabel}>до</label>
          <input value={rightInputValue} placeholder={``}
                 onChange={handleChangeRightInput}
                 className={styles.priceInput} />
          {!!rightInputValue && <div
              onClick={handleClickClearRightInput}
              className={styles.close} />}
        </div>
      </div>
      <div style={{ margin: '0 auto'}}>
        <input type="submit" onClick={handleClickPushPriceParam} disabled={!setValue} value={"Отправить"} className={classNames(styles.submitPriceButton, {[styles.active]: setValue})} />
      </div>
    </div>
  )
}