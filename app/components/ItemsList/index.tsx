import React from 'react'
import { Item } from '../../types'
import Image from 'next/image'
import useSWR from 'swr'

import styles from './ItemsList.module.css'
import fetcher from "../../utils/fetcher";

export interface Props {
  items: Item[]
}


export default function ItemsList({ items }: Props) {
  const [ initialQueryParams, setInitialQueryParams ] = React.useState<string>()
  const [ queryParams, setQueryParams ] = React.useState<string>()
  const { data } = useSWR(queryParams ? `/api/v1/items_list/${queryParams}` : null, fetcher)

  React.useEffect(() => {
    if (document.location.search) {
      setQueryParams(document.location.search.slice(1))
      setInitialQueryParams(document.location.search.slice(1))
    }
  }, [])

  // const priceFilter = React.useCallback((values: Record<string, any>) => {
  //   console.log(values)
  //   const queryString = new URLSearchParams(values).toString()
  //   console.log(queryString)
  //   setQueryParams(queryString)
  // }, [])

  return (
    <div>
      {data?.map((item: Item) => (
          <div className={styles.itemBox}>
            <div className={styles.imageBox}>
              <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150" alt="" />
            </div>
            <div>
              <div className={styles.nameBox}>
                <div>{item.name}</div>
                <div>{item.brand}</div>
              </div>
              <div className={styles.othersBox}>
                <div>{item.order_available}</div>
                <div>{item.rating}</div>
              </div>
            </div>
            <div className={styles.priceBox}>
              <div>{item.price + `₽`}</div>
            </div>
          </div>
      ))}
    </div>
  )
}

