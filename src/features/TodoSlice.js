import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import BACKEND_URL from "../../config";


const initialState = {
  todos: [],
  loading : false,
  error : null
}

export const addTodoAsync = createAsyncThunk("todo/addTodoAsync", async(title)=>{
  const res  = await fetch(`${BACKEND_URL}/todos`, {
    method : "POST",
    headers : { "Content-Type" : "application/json" },
    body : JSON.stringify({ title : title , completed : false })
  })
  return await res.json();
})

export const fetchTodo = createAsyncThunk("todo/fetchTodo",  async()=>{
  const res = await fetch(`${BACKEND_URL}/todos`);
  return await res.json();
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async({id, updatedTitle})=>{
  const res = await fetch(`${BACKEND_URL}/todos/${id}`,
    {
      method : "PUT",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify({ title: updatedTitle }),
    }
  );
  return await res.json();
})

export const toggleTodo = createAsyncThunk("todo/toggleTodo", async({id, completed},thunkAPI)=>{
  const res = await fetch(`${BACKEND_URL}/todos/${id}`,{
    method : "PATCH",
    headers: { "Content-Type" : "application/json" },
    body : JSON.stringify({completed : !completed })
  })
  const data = await res.json();
  return data;
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async(id, thunkAPI)=>{
  const res = await fetch(`${BACKEND_URL}/todos/${id}`,{
    method : "DELETE"
  })
  if(!res.ok){
    return thunkAPI.rejectWithValue("Failed to Delete");
  }
  return id;
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

    // Add Todo
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

    // Fetch Todo 
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
      state.error = "Failed to Fetch";
    })

    // update Todo 
    builder
    .addCase(updateTodo.pending, (state) => {
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[index] = action.payload;
    })
    .addCase(updateTodo.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // delete Todo
    builder
    .addCase(deleteTodo.pending , (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteTodo.fulfilled, (state,action)=>{
      state.loading =  false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    })
    .addCase(deleteTodo.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload || action.error.message;
    })

    // Toggle Todo
    builder
    .addCase(toggleTodo.pending, (state)=>{
      state.error = null;
    })
    .addCase(toggleTodo.fulfilled, (state,action)=>{
      const { id , completed } = action.payload;
      const todo = state.todos.find( t=> t.id === id )
      if(todo) todo.completed = completed;
    })
    .addCase(toggleTodo.rejected, (state)=>{
      state.error = "Error to toggle"
    })
  }
})



export const { removeTodo, completedTodo} = todoSlice.actions

export default todoSlice.reducer