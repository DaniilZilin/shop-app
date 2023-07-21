import React from 'react'
import { Item } from '../../../types'
import Image from 'next/image'
import useSWR from 'swr'
import { Rate } from 'antd'


import styles from './ItemsList.module.css'
import fetcher from '../../../utils/fetcher'
import { useDispatch } from 'react-redux'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import ItemState from '../cart/ItemState'

export interface Props {
  items: Item[]
}

export default function ItemsList({ items }: Props) {
  const [ queryParams, setQueryParams ] = React.useState<boolean>(true)
  const { data } = useSWR(queryParams ? `/api/v1/items_list/list/` : null, fetcher)


  // const priceFilter = React.useCallback((values: Record<string, any>) => {
  //   console.log(values)
  //   const queryString = new URLSearchParams(values).toString()
  //   console.log(queryString)
  //   setQueryParams(queryString)
  // }, [])

  const { cartItems } = useTypesSelector(state => state.user)
  const dispatch = useDispatch()

  // const setCart = () => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems))
  //   dispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('cartItems'))})
  //   // localStorage.setItem('cartFullPrice', JSON.stringify(cartFullPrice))
  // }

  const AddToCart = (item: Item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
    // setCart()
    // localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  React.useEffect(() => {
    // setCart()
  }, [])

  const totalSum = cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
  console.log(cartItems)

  return (
    <div>
      <div>Общая стоимость {totalSum}₽</div>
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
                <Rate disabled defaultValue={item.rating} />
              </div>
            </div>
            <div className={styles.priceBox}>
              <div>{item.price + `₽`}</div>
              <ItemState item={item} AddToCart={AddToCart} />
            </div>
          </div>
      ))}
    </div>
  )
}

