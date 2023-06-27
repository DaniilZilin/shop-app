import React from 'react'
import ItemsList from '../../components/modules/ItemsList'
import { Item } from '../../types'

export interface Props {
  items: Item[]
}

export default function ItemsListView({ items }: Props) {
  return (
    <ItemsList items={items}/>
  )
}