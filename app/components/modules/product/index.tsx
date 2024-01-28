import React from 'react'

import { Item } from '../../../types'
import Carousel from './Carousel'
import AddToCartButton from '../ItemList/AddToCartButton'
import { Rate } from "antd"

import styles from './product.module.css'
import Image from 'next/image'

export interface Props {
  good: Item
}

let ruble = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0})

export default function ProductItem({ good }: Props) {
  return (
    <div>
      <main className="sandbox" style={{ display: 'flex' }}>
        <section className={styles.sandbox__carousel}>
          <Carousel good={good} />
        </section>
        <div>
          <div style={{ display: 'flex' }}>
            <div className={styles.productName}>{good.name}</div>
            <Image src={`/img/brand_images/${good.brand}.png`} alt='' width={110} height={28} />
          </div>
          <div>
            <Rate disabled defaultValue={good.rating}/>
            <AddToCartButton item={good} />
            <div>{ruble.format(good.price)}</div>
            <div></div>
            <div>
            {good.characteristics.map((item) => (
              <div>
                <div>{item.type}</div>
                <div>{item.country}</div>
                <div>{item.grant}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </main>
      <div className={styles.bottomContainer}>
        <h1>О товаре</h1>
        {good.description}
      </div>
    </div>
  )
}