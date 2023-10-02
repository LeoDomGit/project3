import { configureStore } from "@reduxjs/toolkit";
import majorReducer from "./redux/MajorSlice";
export const store = configureStore({
    reducer:{
        majors:majorReducer
    }
});