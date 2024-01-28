import React from 'react'

import { Item } from '../../types'
import ProductItem from '../../components/modules/product'

export interface Props {
  good: Item,
}

export default function ProductView({ good }: Props) {
  return (
    <div>
      <ProductItem good={good} />
    </div>
  )
}