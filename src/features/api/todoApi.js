import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BACKEND_URL from '../../../config'


export const todoApi = createApi({
  baseQuery : fetchBaseQuery({ baseUrl : `${BACKEND_URL}`}),
  endpoints : (builder) =>({
    getTodo : builder.query({
      query: ()=> "/todos",
    })
  })
});

export const { useGetTodoQuery } = todoApi;


