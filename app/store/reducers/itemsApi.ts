import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:3000/api/v1/items_list/list'

export const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getItems: build.query({
      query: query => ({
        url: `/?${query}`,
        params: { price: query }
      })
    })
  })
})

export const { useGetItemsQuery } = itemsApi