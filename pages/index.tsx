import React from 'react'
import MainLayout from '../app/Layout'
import ItemListView from '../app/views/ItemList'
import { Item } from '../app/types'
import fetcher from '../app/utils/fetcher'
import { NextPageContext } from 'next'

export interface Props {
  items: Item[]
}

const getItemList = async (params?: string) => {
  return await fetcher(`http://localhost:3000/api/v1/items_list/list${params}`)
}

export default function ItemsPage({ items }: Props) {
  return (
    <MainLayout items={items}>
      <ItemListView items={items}  />
    </MainLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      items: await getItemList(context.req?.url as string),
    },
  }
}