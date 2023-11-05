import React from 'react'
import { Layout } from 'antd'
import HeaderReact from './Header'
import FooterReact from './Footer'
import ContentReact from './Content'
import SliderReact from './Slider'
import MiniCartContext from '../contexts/MiniCartContext'

import { Item } from '../types'

export interface Props {
  children: React.ReactNode
  items: Item[]
}

export default function MainLayout({ children, items }: Props) {
  const [ shouldDisplayMiniCart, setShouldDisplayMiniCart ] = React.useState(false)

  const showMiniCartTemporarily = React.useCallback(() => {
    setShouldDisplayMiniCart(true)
    setTimeout(() => setShouldDisplayMiniCart(false), 5000)
  }, [])

  return (
    <Layout>
      <HeaderReact setShouldDisplayMiniCart={setShouldDisplayMiniCart} shouldDisplayMiniCart={shouldDisplayMiniCart} />
      <Layout>
        <SliderReact items={items}/>
        <MiniCartContext.Provider value={showMiniCartTemporarily}>
          <ContentReact children={children} />
        </MiniCartContext.Provider>
      </Layout>
      <FooterReact />
    </Layout>
  )
}