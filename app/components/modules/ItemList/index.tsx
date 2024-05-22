import React from 'react'
import { Item } from '../../../types'
import Image from 'next/image'
import { Rate } from 'antd'

import { useRouter } from 'next/router'

import styles from './ItemsList.module.css'
import AddToCartButton from './AddToCartButton'
import { useGetItemsQuery } from '../../../store/reducers/itemsApi'
import SortingDropdown from './SortingDropdown'

export default function ItemList() {
  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
  const router = useRouter()

  const queryParams = React.useMemo(() => {
    const sort = router.query.sort ? router.query.sort : undefined
    const price = router.query.price ? router.query.price : undefined
    if (price !== undefined) {
      const [start, end] = (price as string).split('-')
      return { sort: sort, priceFrom: start, priceTo: end }
    } else {
      return { sort: sort, priceFrom: undefined, priceTo: undefined }
    }
  }, [ router ])

  const { data } = useGetItemsQuery(queryParams)

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <SortingDropdown />
        <div>
          {data.length >= 1 ?
            (data.map((item: Item) => (
            <div key={item.id} className={styles.itemBox}>
              <div className={styles.imageBox}>
                <Image className={styles.itemPhoto} src={`/img/items_images/${item.photos[0].photo}`} width="150" height="150"
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
              ))
            )
            :
            (
              <>Ничего не найдено, попробуйте изменить параметры поиска</>
          )}
        </div>
      </div>
    </>
  )
}

