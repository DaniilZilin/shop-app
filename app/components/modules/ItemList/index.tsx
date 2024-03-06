import React, { ChangeEvent } from 'react'
import { Item } from '../../../types'
import Image from 'next/image'
import { Rate } from 'antd'

import Router from 'next/router'


import styles from './ItemsList.module.css'
import AddToCartButton from './AddToCartButton'
import SortingDropdown from '../../../Layout/Content/SortingDropdown'

export interface Props {
  // items: Item[]
}

export default function ItemList({ }: Props) {
  const [ isVisible, setIsVisible ] = React.useState<boolean>(false)
  const [ currentSortingParam, setCurrentSortingParam ] = React.useState("По названию (возрастание)")
  const dropdownMenuRef = React.useRef(null)

  const handleClickDisplayDiv = React.useCallback(() => {
    setIsVisible(!isVisible)
  }, [ setIsVisible, isVisible ])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (!dropdownMenuRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler);
  })

  let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

  return (
    <>
      <div>
        <div onClick={handleClickDisplayDiv} ref={dropdownMenuRef}>
          <div>Сортировать: {currentSortingParam}</div>
          {isVisible && <SortingDropdown currentSortingParam={currentSortingParam} setCurrentSortingParam={setCurrentSortingParam} setIsVisible={setIsVisible} />}
        </div>
        <div>
          {/*{items.length >= 1 ?*/}
          {/*  (items.map((item: Item, i) => (*/}
          {/*  <div key={i} className={styles.itemBox}>*/}
          {/*    <div className={styles.imageBox}>*/}
          {/*      <Image className={styles.itemPhoto} src={`/img/items_images/${item.photos[0].photo}`} width="150" height="150"*/}
          {/*             alt=""/>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <div className={styles.nameBox}>*/}
          {/*        <div>{item.name}</div>*/}
          {/*        <div>{item.brand}</div>*/}
          {/*      </div>*/}
          {/*      <div className={styles.othersBox}>*/}
          {/*        <div>{item.order_available}</div>*/}
          {/*        <Rate disabled defaultValue={item.rating}/>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className={styles.priceBox}>*/}
          {/*      <div>{ruble.format(item.price)}</div>*/}
          {/*      <AddToCartButton item={item}/>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*    ))*/}
          {/*  )*/}
          {/*  :*/}
          {/*  (*/}
          {/*    <>Ничего не найдено, попробуйте изменить параметры поиска</>*/}
          {/*)}*/}
        </div>
      </div>
    </>
  )
}

