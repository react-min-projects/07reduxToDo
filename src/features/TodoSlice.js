import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import BACKEND_URL from "../../config";


const initialState = {
  todos: [],
  loading : false,
  error : null
}

export const todoSlice = createSlice({
  name : 'todo',
  initialState,
})

export default todoSlice.reducer