import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001"

const initialState = {
  todos: [],
  loading : false,
  error : null
}

export const addTodoAsync = createAsyncThunk("todo/addTodoAsync", async(title)=>{
  const res  = await fetch(`${BASE_URL}/todos`, {
    method : "POST",
    headers : { "Content-Type" : "application/json" },
    body : JSON.stringify({ title : title , completed : false })
  })
  return await res.json();
})

export const fetchTodo = createAsyncThunk("todo/fetchTodo",  async()=>{
  const res = await fetch(`${BASE_URL}/todos`);
  return await res.json();
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async({id, updatedTitle})=>{
  const res = await fetch(`${BASE_URL}/todos/${id}`,
    {
      method : "PUT",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify({ title: updatedTitle }),
    }
  );
  return await res.json();
})

export const todoSlice = createSlice({
  name : 'todo',
  initialState,
  reducers : {
    removeTodo : (state,action)=>{
      state.todos = state.todos.filter((todo) => todo.id !== action.payload )
    },
    completedTodo : (state,action)=>{
      const id = action.payload;
      const todo = state.todos.find(todo=> todo.id === id);
      if(todo) todo.completed = !todo.completed;
    }
  },
  extraReducers : (builder)=>{


    builder
    .addCase(addTodoAsync.pending , (state)=>{
      state.loading = true;
    })
    .addCase(addTodoAsync.fulfilled, (state,action)=>{
      state.loading = false;
      state.todos.push(action.payload);
    })
    .addCase(addTodoAsync.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    })

    builder
    .addCase(fetchTodo.pending,(state)=>{
      state.loading = true;
    })
    .addCase(fetchTodo.fulfilled,(state,action)=>{
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(fetchTodo.rejected,(state)=>{
      state.loading = false;
      state.error = "try again";
    })

    builder
    .addCase(updateTodo.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[index] = action.payload;
    })
    .addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
})



export const { removeTodo, completedTodo} = todoSlice.actions

export default todoSlice.reducer