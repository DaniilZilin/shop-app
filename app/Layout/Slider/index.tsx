import React from 'react'
import { Layout, Menu, theme } from 'antd'
import { Item } from '../../types'

import PriceComponent from './Price'

import styles from './Slider.module.css'
const { SubMenu } = Menu;
const { Sider } = Layout;

export interface Props {
  items: Item[]
}


// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );


export interface Props {
  label: React.ReactNode,
  key: React.Key,
}


export default function SliderReact({ }: Props) {
  const item_list = [
  {
    key: '',
    label: 'Цена',
    children: [
      {
        label: <PriceComponent />
      }
    ]
  },
]

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <Menu
        mode="inline"
        inlineIndent={1}
        // defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '200px' }}
        // items={item_list}
      >
        <SubMenu
          key="sub1"
          title="Цена"
          // className={"sub-menu-custom"}
          style={{ maxHeight: 440 }}
        />
          <PriceComponent  />
      </Menu>
    </Sider>
  )
}