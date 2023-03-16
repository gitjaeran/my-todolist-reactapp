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
  todo: {
    id: "0",
    title: "",
    body: "",
    isDone: false,
  },
};

//get todo
export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//add todo
export const __addTodos = createAsyncThunk(
  "addTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/todos", {
        id: payload.id,
        title: payload.title,
        body: payload.body,
        isDone: payload.isDone,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//delete todo
export const __deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//todo isDone toggle
export const __isDoneStatusTodos = createAsyncThunk(
  "isDoneStatusTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/todos/${payload.id}`,
        {
          // id: payload.id,  //put 사용할때 코드
          // title: payload.title,
          // body: payload.body,
          isDone: !payload.isDone,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Detail.jsx
export const __getTodoId = createAsyncThunk(
  "getTodoId",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//redux toolkit
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //add
    [__addTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = [...state.todos, action.payload];
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //delete
    [__deleteTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //isDoneStatus toggle(false<->true)
    [__isDoneStatusTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__isDoneStatusTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = state.todos.map(list => {
        if (list.id === action.payload.id) {
          return {
            ...list,
            isDone: !list.isDone,
          };
        } else {
          return list;
        }
      });
    },
    [__isDoneStatusTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    //Detail.jsx - get todolist id
    [__getTodoId.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodoId.fulfilled]: (state, action) => {
      // console.log(action.payload, "action.payload");
      state.isLoading = false;
      state.isError = false;
      // console.log(action.payload, "action.payload, reducer");
      state.todo = action.payload;
      // console.log(state.todo, "state.todo, reducer");
    },
    [__getTodoId.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
}); //action creator, reducer 둘 다 들어있음

export default todosSlice.reducer; //reducer 내보내기
export const { getTodos, addTodos, deleteTodos, isDoneStatusTodos, getTodoId } =
  todosSlice.actions; //action 내보내기
