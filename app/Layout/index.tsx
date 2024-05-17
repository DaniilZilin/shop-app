import React from 'react'
import { Layout } from 'antd'
import HeaderReact from './Header'
import FooterReact from './Footer'
import ContentReact from './Content'
import SliderReact from './Slider'
import MiniCartContext from '../contexts/MiniCartContext'

export interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const [ shouldDisplayMiniCart, setShouldDisplayMiniCart ] = React.useState(false)

  const showMiniCartTemporarily = React.useCallback(() => {
    setShouldDisplayMiniCart(true)
    setTimeout(() => setShouldDisplayMiniCart(false), 5000)
  }, [])

  return (
    <Layout>
      <HeaderReact setShouldDisplayMiniCart={setShouldDisplayMiniCart} shouldDisplayMiniCart={shouldDisplayMiniCart} />
      <Layout>
        <SliderReact />
        <MiniCartContext.Provider value={showMiniCartTemporarily}>
          <ContentReact children={children} />
        </MiniCartContext.Provider>
      </Layout>
      <FooterReact />
    </Layout>
  )
}