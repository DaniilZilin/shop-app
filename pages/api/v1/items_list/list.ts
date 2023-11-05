import { NextApiRequest, NextApiResponse } from 'next'
import { Item } from '../../../../app/types'

const ITEM_LIST: Item[] = [
    {
      id: 1,
      name: 'Видеокарта GTX1660Super',
      specs: 'AM4, 2 x 3 ГГц, L2 - 1 МБ, 2хDDR4-2400 МГц, AMD Radeon R5, TDP 35 Вт',
      photo: 'gtx1660super.jpg',
      price: 1399,
      rating: 2.5,
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
      rating: 1.5,
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
  const queryParams = req.query
  // const priceParam = queryParams.price
  // if (priceParam && priceParam.includes('-')) {
  //   const alex = priceParam.indexOf('-')
  //   const min = Number(priceParam.slice(0, alex))
  //   const max = Number(priceParam.slice(alex+1,))
  //   const dolboeb = ITEM_LIST.filter(item => item.price > min && item.price < max)
  //   res.status(200).json(dolboeb)
  // }
  if (queryParams.sort) {
    if (queryParams.sort === 'name_asc') {
      const daun = [...ITEM_LIST].sort((a,b) => (
        a.name > b.name ? 1 : -1
      ))
      res.status(200).json(daun)
    } else if (queryParams.sort === 'name_desc') {
      const alex = [...ITEM_LIST].sort((a,b) => (
        a.name > b.name ? -1 : 1
      ))
      res.status(200).json(alex)
    }
  }
  // else {
  //   res.status(200).json(ITEM_LIST)
  // }
}