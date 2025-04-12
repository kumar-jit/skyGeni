import { configureStore } from "@reduxjs/toolkit";

import { customerTypeReducer } from "./reducers/CustomerReducer.js";
import { accountIndusReducer } from "./reducers/AccountIndusReducer.js";
import { acvRangeReducer } from "./reducers/AcvRangeReducer.js";
import { teamReducer } from "./reducers/TeamReducer.js";


const store = configureStore({
  reducer: { customerTypeReducer,accountIndusReducer, acvRangeReducer, teamReducer}
});
export default store;