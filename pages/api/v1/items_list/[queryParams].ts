import { NextApiRequest, NextApiResponse } from 'next'
import { Item } from '../../../../app/types'


const ITEM_LIST: Item[] = [
    {
      id: 1,
      name: 'Процессор AMD A6-9500E OEM',
      specs: 'AM4, 2 x 3 ГГц, L2 - 1 МБ, 2хDDR4-2400 МГц, AMD Radeon R5, TDP 35 Вт',
      photo: 'gtx1660super.jpg',
      price: 1399,
      rating: 4.5,
      brand: 'Nvidia',
      order_available: 3,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Процессор AMD A6-9500E OEM',
      specs: 'AM4, 2 x 3 ГГц, L2 - 1 МБ, 2хDDR4-2400 МГц, AMD Radeon R5, TDP 35 Вт',
      photo: 'AMD-RYZEN-5-2600.jpg',
      price: 1100,
      rating: 4.5,
      brand: 'AMD',
      order_available: 3,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Клавиатура проводная ZET GAMING Blade [K180]',
      specs: 'AM4, 2 x 3 ГГц, L2 - 1 МБ, 2хDDR4-2400 МГц, AMD Radeon R5, TDP 35 Вт',
      photo: 'zet-keyboard.jpg',
      price: 1699,
      rating: 4.5,
      brand: 'Zet Gaming',
      order_available: 3,
      quantity: 1,
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Item[]>) {
  const initialQueryParams = req.query.queryParams as string
  // console.log(initialQueryParams)
  const values: Record<string, string | string[]> = {}
  if (initialQueryParams) {
    const params = new URLSearchParams(initialQueryParams)
    console.log(params)
    // @ts-ignore
    for (let [key, value] of params.entries()) {
      console.log(key)
      console.log(value)
      if (key === 'sort' || key === 'name') {
        value = value.split(',')
        console.log(value)
      }
      values[key] = value
      console.log(values)
    }
  }
  if (values.sort) {
    if (values.sort == '-price') {
      ITEM_LIST.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
      })
      console.log('-price')
      res.status(200).json(ITEM_LIST)
    } else if (values.sort == 'price') {
      ITEM_LIST.sort((a, b) => {
        if (a.price < b.price) {
          return 1
        }
      })
      console.log('price')
      res.status(200).json(ITEM_LIST)
    } else if (values.sort == 'name_asc') {
      ITEM_LIST.sort((a, b) => {
        if (a.brand == b.brand) {
          return 0;
        }
        return a.brand > b.brand ? 1 : -1;
      })
      res.status(200).json(ITEM_LIST)
    } else if (values.sort == 'name_desc') {
      ITEM_LIST.sort((a, b) => {
        if (a.brand == b.brand) {
          return 0;
        }
        return a.brand < b.brand ? 1 : -1;
      })
      res.status(200).json(ITEM_LIST)
    } else {
      res.status(200).json(ITEM_LIST)
    }
  }

  const SORTED_ITEM_LIST: Item[] = ITEM_LIST

  if (values.f_p) {
    const new_value = values.f_p
    const cut = new_value.split(new_value, '-')
    console.log(new_value)
    // const sepaarate = new_value.split('2')
    //         value = value.split(',')

    console.log('exists')
  }
}