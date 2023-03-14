import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
  todos: [
    {
      id: "0",
      title: "",
      body: "",
      isDone: false,
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
  // todo: {
  //   id: "0",
  //   title: "",
  //   body: "",
  //   isDone: false,
  // },
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      console.log(response, "response data");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  // reducers: {
  //   addTodo: (state, action) => {
  //     return {
  //       ...state,
  //       todos: [...state.todos, action.payload],
  //     };
  //   },
  //   deleteTodo: (state, action) => {
  //     return {
  //       ...state,
  //       todos: state.todos.filter(todo => todo.id !== action.payload),
  //     };
  //   },
  //   toggleStatusTodo: (state, action) => {
  //     return {
  //       ...state,
  //       todos: state.todos.map(todo => {
  //         if (todo.id === action.payload) {
  //           return {
  //             ...todo,
  //             isDone: !todo.isDone,
  //           };
  //         } else {
  //           return todo;
  //         }
  //       }),
  //     };
  //   },
  //   getTodoByID: (state, action) => {
  //     return {
  //       ...state,
  //       todo: state.todos.find(todo => {
  //         return todo.id === action.payload;
  //       }),
  //     };
  //   },
  // },
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      //통신 아직 진행중
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      console.log(action.payload, "action.payload");
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
}); //action creator, reducer 둘 다 들어있음

export default todosSlice.reducer; //reducer 내보내기
export const { addTodo, deleteTodo, toggleStatusTodo, getTodoByID } =
  todosSlice.actions; //action 내보내기
