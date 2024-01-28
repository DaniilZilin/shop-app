import { Sorting } from '../../../types'

const SORTING_LIST: Sorting[] = [
  {
    value: 1,
    label: 'По названию (возрастание)',
    route: 'name',
  },
  {
    value: 2,
    label: 'По названию (убывание)',
    route: '-name',
  },
  {
    value: 3,
    label: 'Недорогие',
    route: '-price'
  },
  {
    value: 4,
    label: 'Дорогие',
    route: 'price',
  }
]

export default SORTING_LIST