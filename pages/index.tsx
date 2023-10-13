import React from 'react'
import MainLayout from '../app/Layout'
import ItemsListView from '../app/views/ItemsList'
import { Item } from '../app/types'
import fetcher from '../app/utils/fetcher'
import { NextPageContext } from 'next'

export interface Props {
  items: Item[]
}

const getItemsList = async() => {
  return await fetcher(`http://localhost:3000/api/v1/items_list/list`)
}

export default function ItemsPage({ items }: Props) {
  return (
    <MainLayout>
      <ItemsListView items={items}  />
    </MainLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      items: await getItemsList(),
    },
  }
}