import React from 'react'

import MainLayout from '../../app/Layout'
import OrderView from '../../app/views/Order'

export interface Props {

}


export default function OrderPage({}: Props) {
  return (
    <MainLayout>
      <OrderView />
    </MainLayout>
  )
}
