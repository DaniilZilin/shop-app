import React from 'react'

import MainLayout from '../../app/Layout'
import CartView from '../../app/views/Cart'

export interface Props {

}

export default function CartPage() {
  return (
    <MainLayout>
      <CartView />
    </MainLayout>
  )
}