export interface SORT {
  id: number,
  sorting_param: string,
  route: string
}

const SORTING_LIST: SORT[] = [
  {
    id: 1,
    sorting_param: 'По названию (убывание)',
    route: 'name_desc'
  },
  {
    id: 2,
    sorting_param: 'По названию (возрастание)',
    route: 'name_asc'
  },
  {
    id: 3,
    sorting_param: 'Недорогие',
    route: 'price_desc'
  },
  {
    id: 4,
    sorting_param: 'Дорогие',
    route: 'price_asc',
  }
]

export default SORTING_LIST