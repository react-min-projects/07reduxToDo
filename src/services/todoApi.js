import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BACKEND_URL from '../../config'


export const todoApi = createApi({
  baseQuery : fetchBaseQuery({ baseUrl : `${BACKEND_URL}`}),
  endpoints : (builder) =>({

    getTodo : builder.query({
      query: ()=> "/todos",
      providesTags: ['Todo'],
    }),

    addTodo : builder.mutation({
      query : (newtodo)=>({
        url     : '/todos',
        method  : 'POST',
        headers : { "Content-Type" : 'application/json' },
        body    : { title : newtodo, completed: false },
      }),
      invalidatesTags : ['Todo'],
    }),

    updateTodo : builder.mutation({
      query : ({id, updatedTitle})=>({
        url     : `/todos/${id}`,
        method  : "PATCH",
        headers : { "Content-Type" : "application/json" },
        body    : { title: updatedTitle }, 
      }),
      invalidatesTags: ['Todo'],
    }),

    toggleTodo : builder.mutation({
      query : ({id, completed})=>({
        url     : `/todos/${id}`,
        method  : "PATCH",
        headers : { "Content-Type" : "application/json" },
        body    : {completed : !completed}
      }),
      invalidatesTags : ["Todo"],
    }),

    delTodo : builder.mutation({
      query: (id)=>({
        url    : `/todos/${id}`,
        method : "DELETE"
      }),
      invalidatesTags: ['Todo'],
    }),

    fetchById : builder.query({
      query: (id)=> `/todos/${id}`,
    })

  }),
});

export const { useGetTodoQuery, useDelTodoMutation, useAddTodoMutation, useUpdateTodoMutation, useToggleTodoMutation, useFetchByIdQuery } = todoApi;


