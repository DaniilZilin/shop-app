import React from 'react'
import { Layout, theme } from 'antd'

const { Header, Content, Footer } = Layout


export default function FooterLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}