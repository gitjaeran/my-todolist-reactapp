import { configureStore } from "@reduxjs/toolkit";

import todos from "../modules/todosSlice";

//redux toolkit
const store = configureStore({
  reducer: {
    todos,
  },
});
export default store;
