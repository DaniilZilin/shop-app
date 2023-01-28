import React from 'react'
import { Breadcrumb, theme, Layout, Divider } from "antd"
import Link from 'next/link'

const { Content } = Layout

export interface Props {
  children: React.ReactNode
}

export default function ContentLayout({ children }: Props) {
  const [value, setValue] = React.useState<string>('Map');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const onSubmit = React.useCallback(() => {

  }, [])

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
          <>
            Сортировать:
            <Divider type="vertical" />
              <Link href='route?sort=price' passHref>по возрастанию цены</Link>
            <Divider type="vertical" />
              <Link href='route?sort=aprice' passHref>по убыванию цены</Link>
          </>
{/*     <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>*/}
      </Breadcrumb>
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