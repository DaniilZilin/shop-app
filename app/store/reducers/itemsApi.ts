import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:3000/api/v1/items_list/list'

interface Item_1 {
  priceFrom?: string,
  priceTo?: string,
  sort?: string,
}

export const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getItems: builder.query<string, Item_1>({
      query: ({ sort, priceFrom, priceTo }) => ({
        url: '/',
        params: {
          sort,
          price: priceFrom && priceTo ? `${priceFrom}-${priceTo}` : ''
        }
      })
    })
  })
})

export const { useGetItemsQuery } = itemsApi