import React from 'react'
import MainLayout from '../app/Layout'
import ItemListView from '../app/views/ItemList'
import { NextPageContext } from 'next'

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