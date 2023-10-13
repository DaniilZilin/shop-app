import React from 'react'
import { Item } from '../../../types'
import Image from 'next/image'
import useSWR from 'swr'
import { Rate } from 'antd'

import styles from './ItemsList.module.css'
import fetcher from '../../../utils/fetcher'
import AddToCartButton from './AddToCartButton'
import Link from 'next/link'

import { useSearchParams } from 'next/navigation'

export interface Props {
  items: Item[]
}

export default function ItemsList({ items }: Props) {
  const [ queryParams, setQueryParams ] = React.useState<boolean>(true)
  const { data } = useSWR(queryParams ? `/api/v1/items_list/list?` : null, fetcher)

  // const priceFilter = React.useCallback((values: Record<string, any>) => {
  //   console.log(values)
  //   const queryString = new URLSearchParams(values).toString()
  //   console.log(queryString)
  //   setQueryParams(queryString)
  // }, [])

  // const params = new URLSearchParams(window.location.pathname)
  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

  return (
  <>
    <Link href="?order=2">123</Link>
    <div>
      {items?.map((item: Item) => (
        <div className={styles.itemBox}>
          <div className={styles.imageBox}>
            <Image className={styles.itemPhoto} src={`/img/items_images/${item.photo}`} width="150" height="150"
                   alt=""/>
          </div>
          <div>
            <div className={styles.nameBox}>
              <div>{item.name}</div>
              <div>{item.brand}</div>
            </div>
            <div className={styles.othersBox}>
              <div>{item.order_available}</div>
              <Rate disabled defaultValue={item.rating}/>
            </div>
          </div>
          <div className={styles.priceBox}>
            <div>{ruble.format(item.price)}</div>
            <AddToCartButton item={item}/>
          </div>
        </div>
      ))}
    </div>
        </>
  )
}

