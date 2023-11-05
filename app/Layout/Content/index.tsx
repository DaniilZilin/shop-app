import React from 'react'
import { theme, Layout } from "antd"

const { Content } = Layout

export interface Props {
  children: React.ReactNode
}

export default function ContentLayout({ children }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}