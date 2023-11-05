import React, { ChangeEvent } from 'react'
import Router from 'next/router'

import SORTING_LIST from './sorting_params'
import { SORT } from './sorting_params'

import styles from './dropdown.module.css'

export interface Props {
  setCurrentSortingParam(param: string): void;
  setIsVisible(params: boolean): void
}

export default function SortingDropdown({ setCurrentSortingParam, setIsVisible }: Props) {
  const [ isChecked, setIsChecked ] = React.useState<number>(1)

  const handleClickRadio = React.useCallback((param: SORT) => {
    setCurrentSortingParam(param.sorting_param)
    setIsVisible(false)
    Router.push({
      pathname: '/',
      query: { sort: `${param.route}` }
    })
  }, [ setCurrentSortingParam, setIsVisible ])

  const handleChangeRadioInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(isChecked)
  }, [ setIsChecked, isChecked ])

  return (
    <div className={styles.root}>
      {SORTING_LIST.map((item) => (
        <label key={item.id} onClick={() => handleClickRadio(item)} className={styles.dropdownElement}>
          <input type="radio" onChange={handleChangeRadioInput} checked={item.id===isChecked} />
          {item.sorting_param}
        </label>
      ))}
    </div>
  )
}