import React from 'react'

import dynamic from 'next/dynamic'
import CreditCard from '../../components/modules/order/creditCardForm'
import UserForm from '../../components/modules/order/userForm'

const Maps = dynamic(() => import('../../components/modules/order/addressInfo'), {
  ssr: false,
});

export default function OrderView() {
  const [ userId, setUserId ] = React.useState<boolean>(false)
  const [ values, setValues ] = React.useState<boolean>(false)

  // if (!userId) {
  //   return <UserForm setUserId={setUserId} />
  // } else if (!values) {
  //   return <CreditCard setValues={setValues} />
  // } else {
    return <Maps />
 // }
}
