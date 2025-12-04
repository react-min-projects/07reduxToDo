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

      async onQueryStarted({id, updatedTitle}, {dispatch, queryFulfilled}){
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodo", undefined, (draft)=>{
            const todo = draft.find((t)=> t.id === id);
            if(todo) todo.title = updatedTitle;
          })
        )

        try{
          await queryFulfilled;
        }
        catch{
          patchResult.undo();
        }
        
      }
    }),

    toggleTodo : builder.mutation({
      query : ({id, completed})=>({
        url     : `/todos/${id}`,
        method  : "PATCH",
        headers : { "Content-Type" : "application/json" },
        body    : {completed : !completed}
      }),
      async onQueryStarted({id, completed},{dispatch,queryFulfilled}){
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodo", undefined, (draft)=>{
            const todo = draft.find((t) => t.id === id);
            if(todo) todo.completed = !completed;
          })
        )
        try  { await queryFulfilled; }
        catch{ patchResult.undo();   }
      }
    }),

    delTodo : builder.mutation({
      query: (id)=>({
        url    : `/todos/${id}`,
        method : "DELETE"
      }),

      async onQueryStarted(id,{dispatch, queryFulfilled}){
        
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodo", undefined, (draft)=>{
            const index = draft.findIndex((t) => t.id === id);
            if(index !== -1) draft.splice(index,1); 
          })
        );

        try  { await queryFulfilled; }
        catch{ patchResult.undo(); }
      }
    }),

    fetchById : builder.query({
      query: (id)=> `/todos/${id}`,
    })

  }),
});

export const { useGetTodoQuery, useDelTodoMutation, useAddTodoMutation, useUpdateTodoMutation, useToggleTodoMutation, useFetchByIdQuery } = todoApi;


