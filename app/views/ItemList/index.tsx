import React from 'react'
import ItemList from '../../components/modules/ItemList'
import { Item } from '../../types'

export interface Props {
  items: Item[]
}

export default function ItemListView({ items }: Props) {
  return (
    <ItemList items={items}/>
  )
}