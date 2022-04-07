import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice"
import blogsReducer from "../features/blogs/blogsSlice";

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        blogs: blogsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;