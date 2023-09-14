import { configureStore } from "@reduxjs/toolkit";
import dataSlice from './DataSlice';
import ProjectSlice from "./ProjectSlice";
import UsersSlices from "./UsersSlices";

export const myStore = configureStore({
    reducer: {
        data: dataSlice,
        project:ProjectSlice,
        user:UsersSlices
    }
})