import { configureStore } from "@reduxjs/toolkit";

import todos from "../modules/todosSlice";

//일반 리듀서
// const rootReducer = combineReducers({
//   todos,
// });
// const store = createStore(rootReducer);

//redux toolkit
const store = configureStore({
  reducer: {
    todos,
  },
});
export default store;
