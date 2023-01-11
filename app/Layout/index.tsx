import React from 'react'
import { Layout } from 'antd'
import HeaderReact from './Header'
import FooterReact from './Footer'
import ContentReact from './Content'
import SliderReact from './Slider'

export interface Props {
  children: React.ReactNode
}


export default function MainLayout({ children }: Props) {
  return (
    <Layout>
      <HeaderReact/>
      <Layout>
        <SliderReact />
        <ContentReact children={children} />
      </Layout>
      <FooterReact />
    </Layout>
  )
}