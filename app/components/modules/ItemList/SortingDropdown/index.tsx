import React from 'react'
import Router from 'next/router'
import { useSearchParams } from 'next/navigation'

import SORTING_LIST from './sorting_params'
import styles from './dropdown.module.css'
import { Sorting } from '../../../../types'

export default function SortingDropdown() {
  const [ isVisible, setIsVisible ] = React.useState<boolean>(false)

  const searchParams = useSearchParams()
  const sort_1 = searchParams.get('sort')
  const sort: string = sort_1 !== null ? sort_1 : '';

  const [ currentParam, setCurrentParam ] = React.useState<any>(sort ? SORTING_LIST.find((item) => item.slug === sort)?.label : SORTING_LIST.find((item) => item.value === 1)?.label )
  const dropdownRef = React.useRef(null)

  const dropdownToggle = React.useCallback(() => {
    setIsVisible(!isVisible)
  }, [ setIsVisible, isVisible ])

  const setSortParam = React.useCallback((item: Sorting) => {
    setCurrentParam(item.label)
     Router.push({
      pathname: '/',
      query: { sort: item.slug },
    }
    ,undefined, { shallow: true })
  }, [ setCurrentParam ])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (!dropdownRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler);
  })

  return (
    <div ref={dropdownRef}>
      <div onClick={dropdownToggle}>Сортировать: {currentParam}
        {isVisible && (
        <div className={styles.root}>
          {SORTING_LIST.map((item, index) => (
            <label key={index} className={styles.dropdownElement} onClick={() => setSortParam(item)}>
              <input type="radio" value={item.label} defaultChecked={item.label===currentParam} />
              {item.label}
            </label>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}