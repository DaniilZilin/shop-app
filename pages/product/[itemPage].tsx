import React from 'react'

import { Item } from '../../app/types'
import { NextPageContext } from 'next'
import MainLayout from '../../app/Layout'
import ProductView from '../../app/views/Product'
import fetcher from '../../app/utils/fetcher'

export interface Props {
  good: Item
}

const getItemData = async (itemPage: string) => {
  return await fetcher(`http://localhost:3000/api/v1/product/${itemPage}`)
}

export default function ItemPage({ good }: Props) {
  return (
    <MainLayout>
      <ProductView good={good} />
    </MainLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      good: await getItemData(context.query.itemPage as string)
    }
  }
}