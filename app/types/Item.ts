import { PhotoType, Characteristics, ItemType } from './index'

export interface Item {
  id: number,
  name: string,
  specs: string,
  description: string,
  photos: PhotoType[],
  slug: string,
  price: number,
  rating: number,
  brand: string
  order_available: number,
  quantity: number,
  characteristics: Characteristics[]
}