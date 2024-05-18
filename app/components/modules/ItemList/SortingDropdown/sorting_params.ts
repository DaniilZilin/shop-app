import { Sorting } from '../../../../types'

const SORTING_LIST: Sorting[] = [
  {
    value: 1,
    label: 'По названию (возрастание)',
    slug: 'name',
  },
  {
    value: 2,
    label: 'По названию (убывание)',
    slug: '-name',
  },
  {
    value: 3,
    label: 'Недорогие',
    slug: '-price'
  },
  {
    value: 4,
    label: 'Дорогие',
    slug: 'price',
  }
]

export default SORTING_LIST