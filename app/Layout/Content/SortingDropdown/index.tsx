import React, { ChangeEvent } from 'react'
import Router from 'next/router'

import { Sorting } from '../../../types'
import SORTING_LIST from '../../../Layout/Content/SortingDropdown/sorting_params'

import styles from './dropdown.module.css'

export interface Props {
  setCurrentSortingParam(param: string): void;
  setIsVisible(param: boolean): void;
  currentSortingParam: string;
}

export default function SortingDropdown({ setCurrentSortingParam, currentSortingParam, setIsVisible }: Props) {
  const [ currentActiveInput, setCurrentActiveInput ] = React.useState<number>(4)

  const handleClickRadioInput = React.useCallback((item: Sorting) => {
    setCurrentActiveInput(item.value)
    console.log(item)
    if (item.value !== currentActiveInput) {
      setCurrentSortingParam(item.label)
      setIsVisible(false)
      setCurrentActiveInput(item.value)
      // handleChangeRadioInput(item.value)
    }
  }, [ setIsVisible, setCurrentSortingParam, setCurrentActiveInput ])

  React.useEffect(() => {
    console.log(currentActiveInput)
  })

  const handleChangeRadioInput = React.useCallback((item: number) => {
    setCurrentActiveInput(item)
    console.log(currentActiveInput)
  }, [ setCurrentActiveInput ])

  return (
    <div className={styles.root}>
      {SORTING_LIST.map((item, index) => (
        <label key={index} onClick={() => handleClickRadioInput(item)} className={styles.dropdownElement}>
          <input type="radio" onChange={() => handleChangeRadioInput} checked={item.value===currentActiveInput} value={item.label} />
          {item.label}
        </label>
      ))}
    </div>
  )
}

      // <label className={styles.filterLabel}>
      //   <input type="radio" {...input} checked={input.value===option.value} value={option.value} className={styles.CheckboxMargin}/>
      //   {option.label}
      // </label>