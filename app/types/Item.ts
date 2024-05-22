import { PhotoType, Characteristics } from './index'
import { CHARACTERISTICS, DEVICE_TYPES } from "../constants"

export interface Item {
  id: number,
  name: string,
  device_type: DEVICE_TYPES,
  characteristics: CHARACTERISTICS[]
  specs: string,
  description: string,
  photos: PhotoType[],
  slug: string,
  price: number,
  rating: number,
  brand: string
  order_available: number,
  quantity: number,
}