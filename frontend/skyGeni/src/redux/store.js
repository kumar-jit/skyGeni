import { configureStore } from "@reduxjs/toolkit";

import { dashBoardReducer } from "./reducers/dashBoardReducer.js";

const store = configureStore({
  reducer: { dashBoardReducer}
});
export default store;