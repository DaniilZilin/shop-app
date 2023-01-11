import { NextApiRequest, NextApiResponse } from 'next'
import { Item } from '../../../../app/types'

const ITEM_LIST: Item[] = [
    {
      id: 1,
      name: 'Процессор AMD A6-9500E OEM',
      specs: 'AM4, 2 x 3 ГГц, L2 - 1 МБ, 2хDDR4-2400 МГц, AMD Radeon R5, TDP 35 Вт',
      picture: '/public/img/',
      price: 1399,
      rating: 4.5,
      brand: 'AMD',
      order_available: 3,
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Item[]>) {
  res.status(200).json(ITEM_LIST)
}