import React from 'react'
import MainLayout from '../app/Layout'
import ItemListView from '../app/views/ItemList'
import { NextPageContext } from 'next'


// const getItemList = async () => {
//   return await fetcher(`http://localhost:3000/api/v1/items_list/list`)
// }

export default function ItemsPage() {
  return (
    <MainLayout>
      <ItemListView />
    </MainLayout>
  )
}

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      // items: await getItemList(),
    },
  }
}